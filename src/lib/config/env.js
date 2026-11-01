// schema to validate data process.env 
// 1. errors when there is a missed fields 
import {z} from 'zod';
import{config} from "dotenv";
config();

const schema = z.object({
    PORT: z.string().default('3000'),

    MONGODB_URL: z.string(),
    
    JWT_SECRET: z.string(),

    MAIL_USER: z.string().trim().toLowerCase(),

    MAIL_PASSWORD: z.string(),

    GOOGLE_WEB_OAUTH_CLIENT_ID: z.string(),

    REDIDS_PORT: z.string().default('6379'),

    REDIS_HOST: z.string(),

    REDIS_PASSWORD:  z.string(),

    MAILJET_API_KEY: z.string(),

    MAILJET_API_SECRET: z.string(),

    MAILJET_FROM_EMAIL: z.string(),

    MAILJET_FROM_NAME: z.string(),

});

const parsed = schema.parse(process.env);
export const env = {
     port:Number(parsed.port),
    db:{
        url: parsed.MONGODB_URL
    },
    redis:{
        host: parsed.REDIS_HOST,
        port: Number(parsed.REDIS_PORT),
        password: parsed.REDIS_PASSWORD 
    },
    nodemailer:{
        user:parsed.MAIL_USER,
        password: parsed.MAIL_PASSWORD
    },
    jwt:{
        secret: parsed.JWT_SECRET
    },
    payments:{},
    aws: {},

    google:{
        webClientId: parsed.GOOGLE_WEB_OAUTH_CLIENT_ID,
        iosClientId: parsed.GOOGLE_WEB_OAUTH_CLIENT_ID,
    },
    mailjet: {
        apiKey: parsed.MAILJET_API_KEY,
        apiSecret: parsed.MAILJET_API_SECRET,
        fromEmail: parsed.MAILJET_FROM_EMAIL,
        fromName: parsed.MAILJET_FROM_NAME

    }

}

