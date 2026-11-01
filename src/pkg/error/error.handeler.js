import { correlationId } from "../correlation/correlationId.js";
import { logger } from "../logger/logger.js";

export function globalErrorHandeler (err,req,res,_next) {
    logger.error(err.message, {
        stack: err.stack,
        correlationId: req.correlationId
    });

   if (err.isOpritional === true){
    return res.status(err.statusCode).json({
        message: err.message,
        success: false ,
    })
   }
   return res.status(500).json({
    error:'something went wrong',
    success: false
   })
};
