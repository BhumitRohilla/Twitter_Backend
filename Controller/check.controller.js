const userDB = require('../Services/database/user')
const hashDB = require('../Services/database/hash');

async function profile(req,res){
    let {u_id} = req.params;
    try{
        let result = await userDB.getProfile(u_id);
        return res.status(200).json({profile:result[0]})
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"});
    }
}

async function username(req,res){
    const {username} = req.body;
    try{
        let result = await userDB.checkIfUsernameTaken(username);
        if(result.length === 0 ){
            return res.status(200).json({message:"username available"});
        }else{
            return res.status(403).json({message:"username not available"});
        }
    }
    catch(err){
        return res.status(500).json({message:"Test"});
    }
}

async function getListOfUsersToFollow(req,res){
    let {start,length} = req.body;
    if(start===undefined){
        start = 0;
    }
    if(length===undefined){
        length = 10;
    }
    try{
        let result = await userDB.getListOfUsers(start,length);
        return res.status(200).json({result});
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"});
    }
}

async function searchUsers(req,res){
    let username = req.params.username;
    try{
        let result = await userDB.searchUsers(username);
        return res.status(200).json({result});
    }
    catch(err){
        return res.status(500).json({message:'fail'});
    }
}

async function getAllTweetsOfUser(req,res){
    let {u_id} = req.params;
    try{
        let result = await userDB.getAllTweetsOfUser(u_id);
        return res.status(200).json({result});
    }
    catch(err){
        return res.status(500).json({message:'fail'});
    }
}

async function searchHash(req,res){
    const hash = req.params.hash
    try{
        let result = await hashDB.searchHash(hash);
        return res.status(200).json({result});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({messsage:"fail"}); 
    }

}

async function getAllHash(req,res){
    try{
        let result = await hashDB.getAllHash();
        return res.status(200).json({result});
    }
    catch(err){
        return res.status(500).json({message:'fail'});
    }
}

module.exports={profile,username,getListOfUsersToFollow,searchUsers,getAllTweetsOfUser,searchHash,getAllHash};