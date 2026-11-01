  import { fileTypeFromBuffer } from "file-type"; 
  import fs from "node:fs";

  export const allowedFields = {
    images:['image/png', 'image/jpeg'],
    files:['application/pdf', 'application/msword'],
    videos: ['video/mp4'],
    audios: ['audio/mp3']
}

import { AppError } from "../../pkg/error/error.js";
// Middleware to validate file type by magic number (file signatures) 
export const fileValidation =
(allowedTypes= allowedFields.images) => async (req, res, next) => { 
    try { 
        const filePath = req.file.path; 
        const buffer = fs.readFileSync(filePath); 
         const type = await fileTypeFromBuffer(buffer); 
           if (!type || !allowedTypes.includes(type.mime))
             { 
              fs.unlinkSync(filePath);
              return next(new AppError("Invalid file type", 400)); }
    return next();
} catch (error) {
    return next(new Error("Internal server error"));
}
};