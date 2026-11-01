import nodemailer from "nodemailer";
import {env} from "../config/env.js";

// establish connection with gmail 
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: env.nodemailer.user,
        pass: env.nodemailer.password}
}) ;

export async  function sendEmail(to, subject, html){
   
         await transporter.sendMail({
            from: process.env.NAIL_USER ,
            to: to,
            subject: subject,
            html: html

        })
}