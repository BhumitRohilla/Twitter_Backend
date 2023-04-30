const express = require('express');
const router = express.Router();
const multer  = require('multer')
//Middleware
const upload = multer({ dest: 'Uploads/Tweets' })
const {authorize} = require('../Middleware/authrization');

//Controller
const tweetController = require('../Controller/tweet.controller');

router.post('/send',authorize,upload.array('tweetImg',4),tweetController.send)

router.post('/show/follow',authorize,tweetController.showFollow)

router.post('/sendComment',authorize,upload.array('tweetImg',4),tweetController.sendComments)

router.get('/getSingleTweet/:t_id',authorize,tweetController.getSingleTweet)

router.get('/getCommentTweet/:t_id',authorize,tweetController.getAllCommentTweet);

module.exports =  router;