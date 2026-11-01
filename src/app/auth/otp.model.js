import { Schema , model } from "mongoose";
import { timeStamp } from "node:console";

const otpSchema= Schema(
    {
        code:{
            type: String ,
             required: true ,
             length:6 ,
        },
        email: {
            type: String ,
            required: true ,
            lowercase: true,
            trim : true 
        },
        expiresAt: {
            type: Date ,
            required: true ,
            index : {expires:0}
        }
},
    {
        timeStamp:{ 
            createdAt: true,
            updatedAt: false 
        }
    }
)

export const OTP =model ('OTP',otpSchema);
