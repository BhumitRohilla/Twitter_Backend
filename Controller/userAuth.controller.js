const {getUserFromEmail,getUser,refreshUser, createNewUser} = require('../Services/database/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { encrypt, check } = require('../Function/encryption');
const sendVarificationMain = require('../Services/Email/validationMail');
const { makeValidUserName, checkIfAllAreValid } = require('../Function/rejexFunciton');


async function login(req,res){
    let {username,password} = req.body;
    if(username?.trim() === '' || password?.trim() === ''){
        return res.send(400).json({err:'UserName Password Fields are empty'});
    }
    try{
        let user = await getUser(username,password);
        if(user === null){
            return res.status(401).json({err:'No user found'});
        }else{
            let authToken = jwt.sign({
                exp: (Date.now()/1000) + ( 40 * 60 ),
                "userInfo":{...user},
            },process.env.ACCESS_TOKEN);
            
            let refreshToken = jwt.sign({
                exp: (Date.now()/1000) + ( 7 * 24 * 60 * 60 ),
                u_id: user['u_id']
            },process.env.REFRESH_TOKEN)

            res.cookie(
                'twitterAuth', refreshToken,{
                    domain: 'localhost',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    sameSite: 'strict',
                    httpOnly: true,
                    
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
    const token = req.cookies?.twitterAuth;
    if(token === undefined){
        return res.status(401).json({err: 'Unauthorised'}) 
    }

    jwt.verify(token,process.env.REFRESH_TOKEN,async (err,decoded)=>{
        if(!err){
            let u_id = decoded['u_id'];
            let user = await refreshUser(u_id);
            if (user === null ){
                return res.status(401).json({err:'User Not Found'});
            } 
            let authToken = jwt.sign({
                exp: (Date.now()/1000) + ( 40 * 60 ),
                "userInfo":user
            },process.env.ACCESS_TOKEN);

            return res.status(200).json({token:authToken});
            
        }
    })

}

async function logout(req,res){

    if (req.cookies?.twitterAuth === undefined ){
        return res.status(401).send();
    }

    let refreshToken = jwt.sign({
        exp: (Date.now()/1000) + 0,
    },process.env.REFRESH_TOKEN)
    res.cookie('twitterAuth',refreshToken,{
        httpOnly: true,
        maxAge: 1000,
        SameSite: 'strict',
        domain: process.env.HOSTNAME
    })
    return res.status(200).send();
}


async function checkIfUserExist(req,res){
    let {email} = req.body;
    let result  = await getUserFromEmail(email);
    if(result){
        return res.status(200).json({message:'user found'})
    }else{
        return res.status(200).json({message:'user not found'})
    }
}


async function signUp(req,res){
    let {email, name, password } = req.body;
    let username = makeValidUserName(name);
    let user = {email,name,password,username};
    if(!checkIfAllAreValid(user)){
        return res.status(400).json({message:'Not a valid request'});
    }
    console.log(user);
    try{
        let unEncrtyptedPassword = user.password;
        user.password = await encrypt(user.password);
        let result = await createNewUser(user);
        user = await getUser(user.username,unEncrtyptedPassword);
        if(result){
            let authToken = jwt.sign({
                exp: (Date.now()/1000) + ( 15 * 60 ),
                "userInfo":{...user},
            },process.env.ACCESS_TOKEN);
            
            let refreshToken = jwt.sign({
                exp: (Date.now()/1000) + ( 7 * 24 * 60 * 60 ),
                u_id: user['u_id']
            },process.env.REFRESH_TOKEN)

            res.cookie(
                'twitterAuth', refreshToken,{
                    domain: 'localhost',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    sameSite: 'strict',
                    httpOnly: true,
                    
                }
            )
            return res.status(200).json({token: authToken,...user});
        }else{
            return res.status(500).json({message:"Error occure"});
        }
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"});
    }
}

async function sendValidationMail(req,res){
    let {email} = req.body;
    let otp = 0;
    for(let i=0;i<6;++i){
        otp = crypto.randomInt(1,9)+  otp*10;
    }
    try{
        console.log(otp);
        let status = await sendVarificationMain(email,otp);
    }
    catch(err){
        return res.status(500).json({message:"fail"});
    }
    otp = await encrypt(otp.toString());
    jwt.sign(JSON.stringify({email,otp}),process.env.REFRESH_TOKEN,async (err,token)=>{
        console.log(err);
        if(!err){
           
           return res.cookie('signupToken',token,
           {
                domain:'localhost',
                maxAge:  15 * 60 * 1000,
                sameSite:'strict'
           }).status(200).json({message:'success'});
        }else{
            return res.status(500).json({message:'fail'});
        }
    })
    
}

async function checkCode(req,res){
    const {otp} = req.body;
    try{
        let result = await check(otp,req.encOtp);
        if(result){
            return res.status(200).json({message:"User Varified"});
        }else{
            return res.status(401).json({message:'Invalid otp'});
        }
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"});
    }
}


module.exports = {login,refreshToken,logout,signUp,checkIfUserExist,sendValidationMail,checkCode};