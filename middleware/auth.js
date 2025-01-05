const { validatetoken } = require("../Services/auth");

function checkforcookie(cookiename) {
    return (req, res, next)=>{
        const cookievalue=req.cookies[cookiename];
        if(!cookievalue){
            return next();
        }
        try {
            const userpayload=validatetoken(cookievalue);
            req.user=userpayload
        } catch (error) {
        }
        return next();
        
    }
}


module.exports={
    checkforcookie
}