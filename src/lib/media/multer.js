import multer, { diskStorage } from "multer";
import crypto from 'node:crypto'
import {AppError} from "../../pkg/error/error.js"
import { allowedFields } from "./file.validation.js";


function fileUpload(allowedTypes){
    return multer({
        fileFilter:function(req, file, cb){
            if(!allowedTypes.includes(file.mintype)){
               return cb(new AppError('invalid file', 400), false);
            }
            cb(null, true);
        },
    storage:diskStorage({
        destination: 'uploads',
        filename: function(req, file, cb){
            cb(null,`${crypto.randomUUID()}-${file.originalname}`);
        }
    })})

}

export function uploadSingleFile(filedName,allowedTypes=allowedFields.images){
    return fileUpload(allowedTypes).single(filedName);

}


export function uploadArrayOfFiles(fieldName, maxCount){
    return fileUpload().array(fieldName,maxCount);
}


export function uploadfields(fields){
   return fileUpload().fields(fields);

}

















