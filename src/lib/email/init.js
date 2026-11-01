import { MailjetProvider } from "../../pkg/email/mailjit.js";
import { env } from "../config/env.js";

export const MailjetProvider = new MailjetProvider ({
    apiKey: env.mailjet.apiKey,
    apiSecret: env.mailjet.apiSecret,
    fromEmail: env.mailjet.fromEmail,
    fromName: env.mailjet.fromName
})