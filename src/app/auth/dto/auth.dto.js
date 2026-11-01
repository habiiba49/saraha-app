import {email, z} from 'zod'; 

export const registerDTO = z.object({
     email: z.email().lowercase().trim(),
     name: z.string().min(2).max(20).trim(),
    password: z.string().min(8).max(20).trim(), 
    dob: z.date().optional(),
    gendrer: z.enum(['male', 'female']).optional()
    });


export const verifyAccountDTO = z.object({
     email: z.email().lowercase().trim(),
     code: z.string().length(6).trim()
})


export const loginDTO = z.object({
     email: z.email().lowercase().trim(),
     password: z.string().min(8).max(20).trim(),
});


export const sendDTO = z.object({
     email: z.email().lowercase().trim()
});


export const resetPasswordDTO =z.object({
    email: z.email().lowercase().trim(),
    code: z.string().length(6).trim(),
    newPassword: z.string().min(8).max(20).trim()
});


