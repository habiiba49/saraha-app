export class AppError extends Error {
    
    statusCode;
    isOperatioinal; 
    
    constractor(message, statusCode, isOperatioinaln = true ){
        this.statusCode = statusCode;
        this.isOperatioinal= isOperatioinal; 
        Error.captureStackTrace(this, this.constractor);
    }
}

const err = new AppError ('message' , 404); 