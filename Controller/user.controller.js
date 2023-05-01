const userDB = require('../Services/database/user');

async function profile(req,res){
    console.log(req.file);
    console.log(req.user);
    
    try{
        await userDB.updateUser('profilepicture',req.file.filename,'u_id',req.user.u_id);
        return res.status(200).json({url:req.file.filename});
    }
    catch(err){
        return res.status(500).json({message:"Test"});
    }
}

async function username(req,res){
    let {username} = req.body;
    try{
        await userDB.updateUser('username',username,'u_id',req.user.u_id);
        return res.status(200).json({message:"Username updated"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"TEST"});
    }
}

async function follow(req,res){
    let {u_id} = req.body;
    try{
        if(u_id === req.user.u_id){
            return res.status(400).json({message:"user cannot follow itself"});
        }else{
            await userDB.followUser(u_id,req.user.u_id);
            return res.status(200).json({message:"seccess"});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Server error occure"});
    }
}

async function unfollow(req,res){
    let {u_id} = req.body;
    try{
        if(u_id === req.user.u_id){
            return res.status(400).json({message:"user cannot unfollow itself"})
        }else{
            await userDB.unfollowUser(u_id,req.user.u_id);
            return res.status(200).json({message:"success"});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Sever error occure"});
    }
}

async function userToFollow(req,res){
    let {offset,limit} = req.body;
    if(offset === undefined){
        offset = 0;
    }
    if(limit === undefined){
        limit = 5;
    }
    try{
        let result = await userDB.getUserToFollow(req.user.u_id,offset,limit);
        return res.status(200).json(result);
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"});
    }
}

async function liked(req,res){
    let {tId} = req.params;
    try{
        await userDB.addLike(tId,req.user.u_id);
        return res.status(200).json({message:"success"});
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"})
    }
}


async function removeLikes(req,res){
    let {tId} = req.params;
    try{
        await userDB.removeLike(tId,req.user.u_id);
        return res.status(200).json({message:"success"});
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"});
    }
}

async function getAllTweetsOfUser(req,res){
    let {u_id} = req.params;
    try{
        let result = await userDB.getAllTweetsOfUser(u_id,req.user.u_id);
        return res.status(200).json({result});
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"});
    }
}

async function getAllCommentOfUser(req,res){
    let {u_id} = req.params;
    try{
        let result = await userDB.getAllCommentOfUser(u_id,req.user.u_id);
        return res.status(200).json({result});
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"});
    }
}

async function getAllLikedOfUser(req,res){
    let {u_id} = req.params;
    try{
        let result = await userDB.getAllLikedOfUser(u_id,req.user.u_id);
        return res.status(200).json({result});
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"})
    }
}

async function checkFollowStatus(req,res){
    let u_id = req.params.u_id;
    try{
        let result = await userDB.checkFollowStatus(u_id,req.user.u_id);
        (result[0].count == 1)?result = true: result = false;
        return res.status(200).json({result}); 
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"fail"});
    }
}

async function updateProfile(req,res){

    if(req.body.name.trim() === ''){
        return res.status(403).json({message:'Name Empty is not allowd'});
    }

    let headerImg = req.files?.headerImg && req.files?.headerImg[0].filename;
    if(headerImg === undefined){
        headerImg = null;
    }
    let profileImg = req.files?.profileImg && req.files?.profileImg[0].filename;

    let obj={headerpicture:headerImg,name:req.body.name,bio:req.body.bio,profilepicture:profileImg};
    if(profileImg === undefined){
        delete obj.profilepicture;
    }

    try{
        await userDB.updateUserProfile(obj,req.user.u_id);
        return res.status(200).json({message:'success'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'fail'})
    }
}

module.exports ={profile,username,follow,unfollow,userToFollow,liked,removeLikes,getAllTweetsOfUser,getAllCommentOfUser,getAllLikedOfUser,checkFollowStatus,updateProfile};