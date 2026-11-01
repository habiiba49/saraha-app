import jwt from 'jsonwebtoken';
import {env} from "../../../lib/config/env.js";
export function signToken(payload, secret, options){
    return jwt.sign(payload, secret, options);
}

export function verifyToken(
    token,
    secret ='xnjdjkdchkswkljKJSHJKL;LKJHGFDKLJHGFGDFJHGFDSF'
){
    return jwt.verify(token, secret);
}

export function generateToken(payload){
   const accessToken = signToken(payload);
   const refreshToken = signToken(payload);
}