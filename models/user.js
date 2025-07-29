const {createHmac , randomBytes} = require('crypto')
const { createTokenForUser } = require("../services/authentaction")
const { Schema , model} = require("mongoose")

const userSchema = new Schema({
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    salt:{
         type:String,
    },
    password:{
        type:String,
        require:true,
    },
    profileImage:{
        type:String,
        default:"/public/image/avatar.jpg"
    },
    role:{
         type:String,
         enum: ["USER" , "ADMIN"],
         default: "USER"
    }

},{timestamps:true })


// pre function which is use before to save the  data  when sign up  and the password is 
// hashed password 
userSchema.pre("save" , function(next){
    const user = this;

    if(!user.isModified("password"))return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
                            .update(user.password) 
                            .digest("hex")
    this.salt = salt ;
    this.password= hashedPassword
    
    next();

})

// this is use when a user want to signin and  so first check it by mail that it exist or not 
// then matched its password  
// the hash the password which is provided by the user 
userSchema.static("matchPasswordANDGenerateToken" , async function(email, password){
    const user = await this.findOne({email})
    if(!user) throw new Error('user not found ');

    const salt = user.salt;
    const hashedPassword = user.password

    const userProvidedHash = createHmac('sha256', salt)
                            .update(password) 
                            .digest("hex")
    if(!hashedPassword===userProvidedHash)  throw new Error('incorrect password ');                          

    // when email and password match it generate the token    
   const token =  createTokenForUser(user)       
   return token;                     
})


const User = model('user' , userSchema);


module.exports= User;