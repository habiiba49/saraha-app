import { AppError } from '../../pkg/error/error.js';
import * as userRepo from '../user/user.repo.js'
import * as messageRepo from './message.repo.js'

export async function sendMessage(content , receiver, sender){
    const user = await userRepo.finduserById(receiver);
    if (!user) throw new AppError('user not found')

        return await messageRepo.createMessage(content, receiver, sender)

}

export async function getAllMessages(userId){
  const messages = await messageRepo.getAllMessages(userId);
  if (messages.length == 0 )throw new AppError('you have no messages', 404);
  return messages; 
}
