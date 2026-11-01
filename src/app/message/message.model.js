import { Schema } from "mongoose";

const messageSchema= new Schema(
    {
        content:{
            type: String,
            required: true,
            minlength:1 ,
            maxlength: 200,
            trim: true
        },
        receiver:{
            type: Schema.Types.ObjectId ,
            ref: 'User',
            required: true ,

        },
        sender: {
            type: Schema.Types.ObjectId ,
            ref: 'User',
        },
        isDeleted: {
            type: Boolean,
            default: false
        },

    },
    {
        timestamps:{
            createdAt: true,
            updatedAt: true 
        }
    }
)

export const Message = model ('Message' , messageSchema)

