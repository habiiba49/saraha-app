import { OTP } from "./otp.model.js";

export async function createOTP (otpData){
   return await OTP.create(otpData);
}
export async function getOtpByEmail(email){
  return await OTP.findOne({email: email});

}
export async function deletOtp(email){
  return await OTP.deleteMany({email: emai})

}