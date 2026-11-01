import * as userRepo from "../user/user.repo.js"
import { AppError } from '../../pkg/error/error.js';
import fs from 'node:fs';

export const uploadProfilePic = async (userId, file) => {

const user = await userRepo.finduserById(userId);
    if(!user) throw new AppError ("user not found", 404)
        if (user.profilePicPath){
            fs.unlinksync(user.profilePicPath);
        }
        await userRepo.updateUserByEmail(user.email, {profilePicPath:file.path});}