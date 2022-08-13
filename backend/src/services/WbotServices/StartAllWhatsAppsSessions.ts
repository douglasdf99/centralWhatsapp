import ListWhatsAppsService from "../WhatsappService/ListWhatsAppsService";
import { StartWhatsAppSession } from "./StartWhatsAppSession";

export const StartAllWhatsAppsSessions = async (): Promise<void> => {
  console.log("StartAllWhatsAppsSessions");
  const whatsapps = await ListWhatsAppsService();
  console.log("StartAllWhatsAppsSessions whatsapps");

  if (whatsapps.length > 0) {
    console.log("StartAllWhatsAppsSessions whatsapps", whatsapps);

    whatsapps.forEach(whatsapp => {
      StartWhatsAppSession(whatsapp);
    });
  }
};
