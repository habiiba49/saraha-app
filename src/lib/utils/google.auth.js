import { AppError } from "../../pkg/error/error.js";
import{env} from "../config/env.js"
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client()

export async function verifiyGoogleToken (idToken){
    try {
        const ticket = await client.verifyIdToken({
          idToken: idToken,
          audience: [env.google.webClientId,env.google.iosClientId]

        });
        return ticket.getPayload();
      } catch(error){
    throw new AppError('invalid google token')
} 
}

//export function verifyRefreshToken(token){
  //return jwt.verify(token, )

//}

export function setCookies(res, accessToken, refreshToken){
  res.cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: toMs(1, 'hours'),
        path: "/"
    });

    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        maxAge: toMs(7, 'days'),
        path: '/api/auth/refresh-token'
    });

}