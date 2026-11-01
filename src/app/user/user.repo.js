import {User} from "./user.model.js"
export async function updateUserByEmail(email, updatedData){
   return await User.findOneAndUpdate(
        {email: email},
        {updatedData},
        {returnDocument: 'after'}
    )
}

export async function finduserById (id){
    return User.findOne({_id: id , isDeleted: false})
}