import { Router } from "express"; 
export const router = Router();
import authRouter from "./app/auth/auth.route";
import userRouter from "./app/user/user.route";
import messageRouter from "./app/message/message.route";


app.use('/auth', authRouter);
app.use('/user',userRouter);
app.use('/message',messageRouter);
