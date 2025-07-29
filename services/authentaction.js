const JWT = require("jsonwebtoken")

const secret = "@#&^ume$h"

// it gennerate token for the user when user want to make ther account 
function createTokenForUser(user){
    const payload={
        _id:user._id,
        email : user.email,
        profileImage : user.profileImage,
        role : user.role,
    };
    const token = JWT.sign(payload , secret);
    return token;
}

// during the login it werify the token through the password or 
// //payload--> the token is genenrated 
function validateToken(token){
    const payload = JWT.verify(token , secret)
    return payload;
}


module.exports = {
    validateToken,
    createTokenForUser,
}