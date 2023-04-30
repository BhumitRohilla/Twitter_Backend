const { getMentions } = require('../Function/rejexFunciton');
const { getUserIdFromUsername } = require('../Services/database/user');
const tweetDB = require('../Services/database/tweet');

//TODO: Improve menstion and tweet and hash part.
async function send(req,res){ 
    let img = '';
    Array.from(req.files).forEach((obj)=>{
        img+=` ${obj.filename}`;
    })

    let mentions = getMentions(req.body.tweet) ;

    try{

        let result = await tweetDB.sendTweet(req.user.u_id,req.body.tweet,img);
        let u_ids = await getUserIdFromUsername(mentions);
        await tweetDB.addToMentionTable(result[0].t_id,u_ids);
        result = await tweetDB.getTweet(result[0].t_id,req.user.u_id);
        return res.status(200).json({result:result[0]});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error"});
    }
}

async function showFollow(req,res){
    console.log(req.body);
    console.log(req.user);
    try{
        let result = await tweetDB.getFollowTweet(req.user.u_id,req.body.start,req.body.length);
        return res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'Server Error'});
    }

}


async function sendComments(req,res){
    let img = '';
    Array.from(req.files).forEach((obj)=>{
        img+=` ${obj.filename}`;
    })

    let mentions = getMentions(req.body.comment) ;

    try{
        // let result = await sendComment(req.body.t_id,,,img);
        let result = await tweetDB.sendTweet(req.user.u_id,req.body.comment,img,req.body.t_id);
        let u_ids = await getUserIdFromUsername(mentions);
        await tweetDB.addToMentionTable(result[0].t_id,u_ids);
        result = await tweetDB.getTweet(result[0].t_id,req.user.u_id);
        return res.status(200).json({result:result[0]});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error"});
    }
}

async function getSingleTweet(req,res){
    let t_id = req.params.t_id;
    console.log(t_id);
    try{
        let result = await tweetDB.getTweet(t_id,req.user.u_id);
        result = result[0];
        return res.status(200).json({result});
    }
    catch(err){
        return res.status(500).json({message:'Server error occure'});
    }
}

async function getAllCommentTweet(req,res){
    let t_id = req.params.t_id;
    try{
        let result = await tweetDB.getAllCommentTweet(t_id,req.user.u_id);
        return res.status(200).json({result});
    }
    catch(err){
        return res.status(500).json({message:'Server error occure'});
    }
}

module.exports ={send,showFollow,sendComments,getSingleTweet,getAllCommentTweet}