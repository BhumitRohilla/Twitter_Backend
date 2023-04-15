const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Controller
const authController = require('../Controller/userAuth.controller');

router.route('/login').post(authController.login);

router.route('/refresh').post(authController.refreshToken);

router.route('/logout').get((req,res)=>{
    
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
})

module.exports = router;