import { populate } from "dotenv"
import {Message} from "./message.model.js"
export async function createMessage(conten, receiver, sender){
    return Message.create({
        content: content,
        sender: sender, 
        receiver: receiver 
    })
}

export async function getAllMessages(userId){
   return Message.find({
        receiver: userId
    },
    {},
     {populate:{path: "sender", select: "-password"}})
}