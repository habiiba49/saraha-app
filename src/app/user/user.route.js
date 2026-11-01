import { Router } from 'express';
import { uploadArrayOfFiles, uploadSingleFile } from '../../lib/media/multer.js';
import { allowedFields, fileValidation } from '../../lib/media/file.validation.js';
import {guard} from "../../lib/auth/guard.js"
import * as userController from "../user/user.controller.js"


const userRouter= Router();
 


userRouter.post('/upload-profile-pic',
     guard,
     uploadSingleFile('pp'),
     fileValidation(),
     userController.uploadProfilePic
    
    )


userRouter.post('/upload-cv', 
    uploadSingleFile('cv', allowedFields.files),
    fileValidation(allowedFields.files),
(req, res, next) => {
    res.json('okay')
})

userRouter.post('/upload-cover-images', uploadArrayOfFiles('cover-images', 3),(req, res, next) => {
    console.log(req.files)
    res.json('okay')
})

export default userRouter;