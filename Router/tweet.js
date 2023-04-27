const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'Uploads/Tweets' })
//Middleware
const {authorize} = require('../Middleware/authrization');

//Controller
const tweetController = require('../Controller/tweet.controller');
const { sendTweet, getFollowTweet, getTweet, sendComment } = require('../Services/database/tweet');

router.post('/send',authorize,upload.array('tweetImg',4),async (req,res)=>{
    console.log(req?.files);
    console.log(req.body);
    console.log(req.user);
    
    
    let img = '';
    Array.from(req.files).forEach((obj)=>{
        img+=` ${obj.filename}`;
    })


    try{
        let result = await sendTweet(req.user.u_id,req.body.tweet,img);
        console.log(result);
        result = await getTweet(result[0].t_id);
        return res.status(200).json({result:result[0]});
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

router.post('/sendComment',authorize,upload.array('tweetImg',4),async (req,res)=>{
    console.log(req?.files);
    console.log(req.body);
    console.log(req.user);

    let img = '';
    Array.from(req.files).forEach((obj)=>{
        img+=` ${obj.filename}`;
    })
    try{
        let result = await sendComment(req.body.t_id,req.user.u_id,req.body.comment,img);
        console.log(result);
        return res.status(200).json({result:'success'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error"});
    }

})

module.exports =  router;