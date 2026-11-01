
import * as authService from "./auth.service.js"
import { validateBody } from "../../lib/validation/validation.js";
import { loginDTO, registerDTO, resetPasswordDTO, sendDTO, verifyAccountDTO } from "./dto/auth.dto.js";
import { toMs } from "../../pkg/utils/time.js";
import { setCookies } from "../../lib/utils/google.auth.js";

export async function register(req,res,next){
    try {
       const data =  validateBody(registerDTO, req.body);

       const createdUser = await authService.register(data);
       res.status(201).json({
        message:'user created successfully',
        success: true ,
        data: createdUser,
       })

    }catch(error){
        console.log("error", error);
    };
}

export async function verifyAccount(req,res,next){
    try{
       const data = validateBody(verifyAccountDTO, req.body);
       const {email, code}= data;
       const updatedUser = await authService.verifyAccount(email, code);
       res.json({
        message:'user verified successfully',
        success: true ,
        data: updatedUser
       })

    }catch(error){
        next(error);
    }
}

export async function enable2StepVerification(req, res, next){
    try{
        const {email, code} = req.body;
        await authService.enable2StepVerification(email, code);
       res.json({message:"2StepVerification done successfully", success: true});
    } catch(error){
        next(error);

    }

}

export async function login (req, res, next){
    try{
        const data = validateBody(loginDTO, req.body);
        const {email, password} = data ;
        const token = await authService.login(email, password);
        if(!tokens){                                                                                                                                                                              
            return res.json({message:"check your inbox , we send OTP"});
        }

         setCookies(res,accessToken,refreshToken)

    res.json({
        message: "user login successfully",
        success: true,
    });
    } catch (error) {
        next(error)
    }
}


export async function verifyCodeToLogin(req, res, next) {
     try {
         const { email, code } = req.body; 
         const { accessToken, refreshToken } = await authService.verifyCodeToLogin(email, code);
         setCookies(res,accessToken,refreshToken);
    res.json({ message: "login successfully", success: true });
   } catch (error) {
    next(error);
}
}



export async function sendOtp(req, res, next){
    try{
        const data = validateBody(sendDTO, req.body);
        const {email}= data;
        await authService.sendOtp(email);
        res.json({
            message: "new otp sent",
            success: true
        })

    } catch(error){
        next(error);
    }
}

export async function resetPassword(req, res, next){
    try{
        const data = validateBody(resetPasswordDTO, req.body);
        const {email, code, newPassword} =data 
        await authService.resetPassword(email, code, newPassword)
        res.json({
            message:"password updated successfully",
            success: true 
        })

    } catch(error){
        next(error)
    }
}

export async function loginWithGoagle(req, res, next){
    try{
       const token = await authService.loginWithGoagle(req.body.idToken);
       res.cookie('access_token', token, {
        httpOnly: true, 
        maxAge: toMs(1, 'hours' ),
       });
       res.json({
        message: "user login successsfully",
        success: true
       })

    } catch(error){
        next(error)

    }
}

export async function refreshTokenFn(req, res, next) {
     try {
         const { accessToken, refreshToken } = await authService.refreshTokenFn(req.cookies.refresh_token);
        setCookies(res,tokens.accessToken, tokens.refreshToken);

    res.json({
        message: "refresh token successfully", success: true
    });
} catch (error) {
    next(error);
}
}