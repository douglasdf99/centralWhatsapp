import AppError from "../../errors/AppError";
import Contact from "../../models/Contact";

interface ExtraInfo {
  name: string;
  value: string;
}

interface Request {
  name: string;
  number: string;
  email?: string;
  profilePicUrl?: string;
  extraInfo?: ExtraInfo[];
}

const CreateOrFindContactService = async ({
  name,
  number,
  email = "",
  extraInfo = []
}: Request): Promise<Contact> => {
  let contact = await Contact.findOne({
    where: { number }
  });

  if (!contact) {
    contact = await Contact.create(
      {
        name,
        number,
        email,
        extraInfo
      },
      {
        include: ["extraInfo"]
      }
    );
  }

  return contact;
};

export default CreateOrFindContactService;
