const {createNewUser,getUser} = require('../Services/database/user');

let jwt = require('jsonwebtoken');

async function login(req,res){
    let {userName,password} = req.body;
    if(userName.trim() === '' || password.trim() === ''){
        return res.send(400).json({err:'UserName Password Fields are empty'});
    }
    try{
        let user = getUser(userName,password);
        if(user === null){
            return res.send(401).json({err:'No user found'});
        }else{
            let authToken = jwt.sign({
                exp: (Date.now()/1000) + ( 15 * 60),
                "userInfo":user
            },process.env.ACCESS_TOKEN);
            
            let refreshToken = jwt.sign({
                exp: (Date.now()/1000) + ( 7 * 24 * 60 * 60 ),
                userName: userName
            },process.env.REFRESH_TOKEN)

            res.cookie(
                'jwt', refreshToken,{
                    maxAge: 7 * 24 * 60 * 60,
                    sameSite: 'strict',
                    httpOnly: true,
                    domain: process.env.HOSTNAME
                }
            )
            return res.status(200).json({token: authToken});
        }
    }
    catch(err){
        return res.send(500).json({err:'Server Error Occure'});
    }
}

async function refreshToken(req,res){
    let token = req.cookies?.jwt;
    if(token === undefined){
        return res.status(401).json({err: 'Unauthorised'})
    }

    jwt.verify(token,process.env.REFRESH_TOKEN,(err,decoded)=>{
        if(!err){
            let userName = decoded.userName;
            let user = refreshUser(userName);
            if (user === null ){
                return res.status(401).json({err:'User Not Found'});
            } 
            let authToken = jwt.sign({
                exp: (Date.now()/1000) + ( 15 * 60),
                "userInfo":user
            },process.env.ACCESS_TOKEN);

            return res.status(200).json({token:authToken});
            
        }
    })

}

async function logout(req,res){

    if (req.cookie?.jwt === undefined ){
        return res.status(401).send();
    }

    let refreshToken = jwt.sign({
        exp: (Date.now()/1000) + 0,
        userName: userName
    },process.env.REFRESH_TOKEN)
    res.cookie('jwt',refreshToken,{
        httpOnly: true,
        maxAge: 1,
        SameSite: 'strict',
        domain: process.env.HOSTNAME
    })
    return res.status(200).send();
}





async function signUp(req,res){
    let {email, userName, password } = req.body;
    
}

module.exports = {login,refreshToken,logout,signUp};