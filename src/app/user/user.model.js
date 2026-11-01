import { model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            minlengh:3,
            maxlengh:20,
            trim:true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password:{
            type: String,
            required: function(){
                return this.provider ==='/local';
            }
        },
        provider:{
            type: String ,
            enum: ['local', 'google','facebook'],
            default:'local'
        },
        isDeleted:{
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        dob:{
            type: Date 
        },
        gender:{
            type: String ,
            enum: ['male','female'],
            default: 'male'
        },
        profilePicPath: String,
        coverImagePaths:[String],
        cvPath: String,
        twoStepVerification:{
            type: Boolean,
            default: false}
    },
    {
        timestamps: true,
        strict: true,

        toJSON: {virtuals: true}
    }
)

export const User = model('User', userSchema);