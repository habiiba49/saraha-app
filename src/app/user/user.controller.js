import * as userService from "../user/user.service.js"

export const uploadProfilePic = async (req, res, next) =>  {
    res.json('okay')
  try{
    await userService.uploadProfilePic(req.user.id , req.file)
        res.json({message: "upload file successfully"})}
        catch(error){
            next(error)
        }
}