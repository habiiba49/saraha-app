import * as authRepo from "./auth.repo.js"
import * as otpRepo from "./otp.repo.js"
import * as userRebo from "../user/user.repo.js"
import { AppError } from "../../pkg/error/error.js";
import { generateToken } from "./utils/token.js";
import { comparePassword, hashPassaword } from "./utils/hash.js";
import { verifiyGoogleToken } from "../../lib/utils/google.auth.js";
import { MailjetProvider } from "../../pkg/email/mailjit.js";
import crypto from "crypto";
import {cacheProvider} from "../../pkg/cashe/redis.js";
import {toSeconds} from "../../pkg/utils/time.js";



export async function baseFunction(email, code,factory){
    const user = await authRepo.checkUserExistByEmail(email);
    if(!user) throw new AppError('user not exist', 404);
    const otp = await cacheProvider.get(`otp:${email}`);
     if (!otp) throw new AppError ('your otp is expired ,please resend otp ',404 );
    if (otp !==code) throw new AppError ('invalid otp' , 400);
    const result =await  factory(user);
    await cacheProvider .del(`otp:${email}`);
    return result ;
}

export async function register(userData){
    const userExist = await authRepo.checkUserExistByEmail(userData.email);
    if (userExist) throw new AppError('user already exist', 409);
    userData.password =  await hashPassaword(userData.password);
    const createdUser = await authRepo.createUser(userData);
    const code = generateOTPCode();
    await cacheProvider.set(`otp:${createdUser._id.toString()}`, code, toSeconds(3, 'minutes'))
        await MailjetProvider.sendMail(userData.email,'verfication code',
        `<h1>your verfication code is {otp} </h1>`
        )
        return createdUser; 
}

export async function verifyAccount(email, code){
  await  baseFunction(email, code, async () => {
    await userRebo.updatedUser(email,{isVerified: true});
   })
}

export async function enable2StepVerification(email, code){
    await baseFunction(email, code, async ()=> {
       await userRebo.updatedUser(email, {twoStepVerification: true})

    })
}

export async function verifiyCodeToLogin(email, code){
  const {accessToken, refreshToken} = await baseFunction(email, code, async (user)=> {
    const jti = crypto.randomUUID();
    const accessToken = genaerateAccessToken({sub: user._id, name: user.name});
    const refreshToken = generateRefreshToken({ jti: jti, sub : user._id, name: user.name});
    await cacheProvider.set(`refreshToken:${jti}, jti, toseconds (7, 'days' )`);
    return {
        accessToken, 
        refreshToken
    }

   })
    return {accessToken, refreshToken};
}


export async function login (email, password) {
     const cachedTries = await cacheProvider.get(`login-tries:${email}`);
     if(cachedtries === '0') throw new AppError ('too many requests to login, 429');
    const user = await authRepoy.checkUserExistByEmail(email);
    if (!user) throw new AppError('user not exists', 404);
    if (user.isVerified === false) throw new Error('user not verified');
    const match = await comparePassword(password, user['password']);
    if(!match) throw new AppError ('invalid password', 403);
    if (user.twoStepVerification == true){
        const code = generateOTP();
        cacheProvider.set(`otp:${email}`,code, toSeconds(3,'minutes'));
        await MailjetProvider.sendMail(email, '2 step Verification email' ,`h3>your otp to login is $(code)</h3>` )
        return; 
    }
    const jti = crypto.randomUUID();
    const accessToken = genaerateAccessToken({sub: user._id, name: user.name});
    const refreshToken = generateRefreshToken({ jti: jti, sub : user._id, name: user.name});
    await cacheProvider.set(`refreshToken:${jti}, jti, toseconds (7, 'days' )`);
    return {
        accessToken, 
        refreshToken
    }
    let cachedTTL = cacheProvider.ttl('login-tries:${email}');
    cachedTries = cachedTries ?? 4 ;    
    // ??  دي null operator
    const ttl= cachedTTL = -2 ? toSeconds(3, 'minutes') : cachedTTL;
    await cacheProviuder.set('login-tries:${email}', cachedTries - 1, toSeconds(3, 'minutes'));
}
   
export async function sendOtp(email){
    const user = await authRepo.checkUserExistByEmail(email); 
    if (!user) throw new AppError('user not found', 404);
    await otpRepo.deletOtp(email);
    const code = generateOTPCode();
    
    await cacheProvider.set(`otp:${email}, code, toSeconds(3, 'minutes' )`)
  
    await MailjetProvider.sendMail(email, 'new otp', `<p>your new otp is $ {code} </p>` );
}

export async function resetPassword (email, code, newPassword){
   const otp = await otpRepo.getOtpByEmail(email);

   if(!otp) throw new AppError('your otp is expired ,please resend otp ',404 )
   if(otp.code !== code) throw new AppError('invalid otp' , 400)
    const hashedPassword= await hashPassaword(newpassword);
   await userRebo.updateUserByEmail(email, {password, newPassword});
   await otpRepo.deletOtp(email);
}


export async function loginWithGoagle(idToken){
   const getPayload =await verifiyGoogleToken (idToken); 
   const user = await authRepo.checkUserExistByEmail(getPayload.email); 
   if (user) {
    return generateToken({
        id : user._id,
        email: user.email 
    })
   }
   const createdUser = await authRepo.createUser({
    name: Payload.name, 
    email: Payload.email,
    provider : 'google',
    isVerified: true
   });

   return generateToken({
    id: createdUser._id ,
    email: createdUser.email,
   })
};





