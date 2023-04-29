const jwt = require('jsonwebtoken');

function authorize(req,res,next){
    let auth = req.headers.authorization || req.headers.Authorization;

    if(!auth?.startsWith('Bearer ')){
        return res.status(403).json({message:'Not authorized'});
    }

    const token = auth.split(' ')[1];

    jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
        if(!err){
            req.user = decoded.userInfo;
            next();
        }else{
            if(err.message === 'jwt expired'){
                return res.status(401).json({message:'jwt expired'});
            }else{
                return res.status(403).json({message:'Not authorized'})
            }
        }
    })
}

module.exports = {authorize};