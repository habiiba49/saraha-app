import './lib/db/mongoose.js';
import userRouter from './app/user/user.route.js';
import express, { Router } from 'express';
import cors from 'cors';
import { globalErrorHandeler } from './pkg/error/error.handeler.js';
import { correlationId } from './pkg/correlation/correlationId.js';
import cookieParser from 'cookie-parser';
import {rateLimit} from 'express-rate-limit';
import { AppError } from './pkg/error/error.js';
import { toMs } from './pkg/utils/time.js';


export function createApp(){
    const app = express();
    const limiter = rateLimit({
        limit: 3,
        windowMs: toMs(1, 'minutes'),
        standardHeaders: true,
        legacyHeaders: false,
        handler : function (req, res, next){
            next(new AppError(this.message, this.statusCode));
        }
});

    app.use(limiter);
    app.use('/uploads', express.static('uploads'))

    

app.use((req, res, next) => {
    console.log(req.method, req.originalUrl);
    next();
})

app.use(cors({origin: 'http://localhost:4200'}));

//  لو هبعت الداتا في الفورم جيسون ف دي مش هتشتغل
//  بتشتغل مع ال  raw
app.use(express.json());
app.use(cookieParser());

app.use(correlationId);
console.log("app is running")
app.use('./api/user', userRouter);
app.get('/health', (req, res, next)=>{
    console.log('server is HIT')
    res.json('ok')
})

app.use(globalErrorHandeler);

return app;
}

console.log("app is running without error")