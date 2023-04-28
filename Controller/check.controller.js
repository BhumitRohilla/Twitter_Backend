const { checkIfUsernameTaken, getListOfUsers, getProfile } = require('../Services/database/user');

async function profile(req,res){
    let {u_id} = req.params;
    try{
        let result = await getProfile(u_id);
        return res.status(200).json({profile:result[0]})
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"});
    }
}

async function username(req,res){
    const {username} = req.body;
    try{
        let result = await checkIfUsernameTaken(username);
        if(result.length === 0 ){
            return res.status(200).json({message:"username available"});
        }else{
            return res.status(403).json({message:"username not available"});
        }
    }
    catch(err){
        console.log(err);
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
        let result = await getListOfUsers(start,length);
        return res.status(200).json({result});
    }
    catch(err){
        return res.status(500).json({message:"Server error occure"});
    }
}

module.exports={profile,username,getListOfUsersToFollow}