const jwt = require('jsonwebtoken');

function singupTokenParser(req,res,next){
    let signupToken = req.cookies?.signupToken;
    if(signupToken === undefined){
        return res.status(401).json({message:'unautharized'});
    }else{
        jwt.verify(signupToken,process.env.REFRESH_TOKEN,(err,decode)=>{
            if(!err){
                req.encOtp = decode.otp;
                next();
            }else{
                return res.status(401).json({message:'Not a valid token'});
            }
        })
    }
}

module.exports = {singupTokenParser};