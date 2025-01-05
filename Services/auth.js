const jwt=require('jsonwebtoken');

const secret=process.env.KEY;

function createjwttoken(user) {
    const payload={
        _id:user._id,
        email:user.email,
        profileimg:user.profileimg,
        role:user.role,
        fullname:user.fullname
    };

    const token =jwt.sign(payload, secret);
    return token;
}

function validatetoken(token){
    const payload=jwt.verify(token, secret);
    return payload;
}

module.exports={
    createjwttoken,
    validatetoken
}