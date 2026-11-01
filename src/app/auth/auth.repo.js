import {User} from '../user/user.model.js'

async function checkUserExistByEmail (email) {
   return await User.findOne({email: email});
}

async function createUser(userData){
    return await User.create(userData);

}


export {
    checkUserExistByEmail,
    createUser
}