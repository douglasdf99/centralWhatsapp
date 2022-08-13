import { Request, Response } from "express";
import * as Yup from "yup";
import AppError from "../errors/AppError";

import CheckIsValidContact from "../services/WbotServices/CheckIsValidContact";
import CheckContactNumber from "../services/WbotServices/CheckNumber";
import GetProfilePicUrl from "../services/WbotServices/GetProfilePicUrl";
import { FindorCreateContactService } from "../services/ContactServices/CreateContactService";
import { FindOrCreateTicketService } from "../services/TicketServices/CreateTicketService";

import SetTicketMessagesAsRead from "../helpers/SetTicketMessagesAsRead";
import { getIO } from "../libs/socket";
import Message from "../models/Message";

import ListMessagesService from "../services/MessageServices/ListMessagesService";
import ShowTicketService from "../services/TicketServices/ShowTicketService";
import DeleteWhatsAppMessage from "../services/WbotServices/DeleteWhatsAppMessage";
import SendWhatsAppMedia from "../services/WbotServices/SendWhatsAppMedia";
import SendWhatsAppMessage from "../services/WbotServices/SendWhatsAppMessage";
import TraitNineDigit from "../services/ContactServices/TraitNineDigit";

type IndexQuery = {
  pageNumber: string;
};

type MessageData = {
  body: string;
  fromMe: boolean;
  read: boolean;
  quotedMsg?: Message;
};
interface ExtraInfo {
  name: string;
  value: string;
}

interface ContactData {
  name: string;
  userId: number;
  number: string;
  email?: string;
  extraInfo?: ExtraInfo[];
}

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const { pageNumber } = req.query as IndexQuery;

  const { count, messages, ticket, hasMore } = await ListMessagesService({
    pageNumber,
    ticketId
  });

  SetTicketMessagesAsRead(ticket);

  return res.json({ count, messages, ticket, hasMore });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;
  const { body, quotedMsg }: MessageData = req.body;
  const medias = req.files as Express.Multer.File[];

  const ticket = await ShowTicketService(ticketId);

  SetTicketMessagesAsRead(ticket);

  if (medias) {
    await Promise.all(
      medias.map(async (media: Express.Multer.File) => {
        await SendWhatsAppMedia({ media, ticket });
      })
    );
  } else {
    await SendWhatsAppMessage({ body, ticket, quotedMsg });
  }

  return res.send();
};

export const notification = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newContact: ContactData = req.body;

  newContact.number = await TraitNineDigit({ number: newContact.number });

  const schema = Yup.object().shape({
    number: Yup.string()
      .required()
      .matches(/^\d+$/, "Invalid number format. Only numbers is allowed.")
  });

  try {
    await schema.validate(newContact);
  } catch (err) {
    throw new AppError(err.message);
  }

  await CheckIsValidContact(newContact.number);
  const validNumber: any = await CheckContactNumber(newContact.number);
  const profilePicUrl = await GetProfilePicUrl(validNumber);

  const { name } = newContact;
  const number = validNumber;
  const { email } = newContact;
  const { extraInfo } = newContact;
  const { userId } = newContact;
  console.log("entrando");

  const contact = await FindorCreateContactService({
    name,
    number,
    email,
    extraInfo,
    profilePicUrl
  });

  const { body, quotedMsg }: MessageData = req.body;
  console.log("body", body);
  const ticket = await FindOrCreateTicketService({
    contactId: contact.id,
    status: "closed",
    userId
  });

  SetTicketMessagesAsRead(ticket);

  await SendWhatsAppMessage({ body, ticket, quotedMsg });

  return res.send();
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { messageId } = req.params;

  const message = await DeleteWhatsAppMessage(messageId);

  const io = getIO();
  io.to(message.ticketId.toString()).emit("appMessage", {
    action: "update",
    message
  });

  return res.send();
};
