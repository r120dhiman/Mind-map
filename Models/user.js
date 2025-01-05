const {Schema,model}= require('mongoose');
const {createHmac, randomBytes}=require('crypto');
const { createjwttoken } = require('../Services/auth');

const userSchema= new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileimg:{
        type:String,
        default:'/user.svg'
    },
    role:{
        type:String,
        enum:["USER", "ADMIN", "BOSS"],
        default:"USER"
    }
}, {timestamps:true});

userSchema.pre('save', function (next) {
    const user=this;
    if(!user.isModified('password')){
        return;
    }
    const salt=randomBytes(16).toString();
    const hashed=createHmac('sha256', salt)
                 .update(user.password)
                 .digest('hex');
    user.salt=salt;
    user.password=hashed;
    next();
})

userSchema.static('matchpassword',async function (email, password) {
    const user=await this.findOne({email});

    if(!user){
        throw new Error("User Not Found. Check your email or SignUp first.");
    }

    const salt=user.salt;
    const hasdedcoming=createHmac('sha256', salt)
                        .update(password)
                        .digest('hex');
    if(hasdedcoming!==user.password){
        throw new Error("Incorrect Password or Email!");
    }
    const token=createjwttoken(user);
    return token;
})

const user= model("user", userSchema);

module.exports=user;
