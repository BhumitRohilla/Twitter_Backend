const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'Uploads/Tweets' })
//Middleware
const {authorize} = require('../Middleware/authrization');

//Controller
const tweetController = require('../Controller/tweet.controller');
const { sendTweet, getFollowTweet } = require('../Services/database/tweet');

router.post('/send',authorize,upload.array('tweetImg',4),async (req,res)=>{
    console.log(req?.files);
    console.log(req.body);
    console.log(req.user);
    
    
    let img = '';
    Array.from(req.files).forEach((obj)=>{
        img+=` ${obj.filename}`;
    })


    try{
        await sendTweet(req.user.u_id,req.body.tweet,img);
        return res.status(200).json({message:'sucess'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error"});
    }
})

router.post('/show/follow',authorize,async (req,res)=>{
    console.log(req.body);
    console.log(req.user);
    try{
        let result = await getFollowTweet(req.user.u_id,req.body.start,req.body.length);
        return res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'Server Error'});
    }

})


module.exports =  router;