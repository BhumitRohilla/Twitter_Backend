const { updateUser, followUser, unfollowUser, addLike, removeLike } = require('../Services/database/user');
const { checkIfUserExist } = require('../Controller/userAuth.controller');
const { getUserToFollow } = require('../Services/database/user');

async function profile(req,res){
    console.log(req.file);
    console.log(req.user);
    
    try{
        await updateUser('profilepicture',req.file.filename,'u_id',req.user.u_id);
        return res.status(200).json({url:req.file.filename});
    }
    catch(err){
        return res.status(500).json({message:"Test"});
    }
}

async function username(req,res){
    let {username} = req.body;
    try{
        await updateUser('username',username,'u_id',req.user.u_id);
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
            await followUser(u_id,req.user.u_id);
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
            await unfollowUser(u_id,req.user.u_id);
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
        let result = await getUserToFollow(req.user.u_id,offset,limit);
        return res.status(200).json(result);
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"});
    }
}

async function liked(req,res){
    let {tId} = req.params;
    try{
        await addLike(tId,req.user.u_id);
        return res.status(200).json({message:"success"});
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"})
    }
}


async function removeLikes(req,res){
    let {tId} = req.params;
    try{
        await removeLike(tId,req.user.u_id);
        return res.status(200).json({message:"success"});
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"});
    }
}

module.exports ={profile,username,follow,unfollow,userToFollow,liked,removeLikes};