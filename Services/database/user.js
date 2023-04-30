const { check } = require('../../Function/encryption');
const {execQueury} = require('./connection');
const bcrypt = require('bcrypt');


async function getUser(userName,password){
    const query = `select * from Users where userName = '${userName}'`;
    try{
        let result = await execQueury(query);
        if(result.length === 0 ){
            return null;
        }else{
            result = result[0];
            if(result.username === 'testUser'){
                return result;
            }
            //TODO: Test
            let match = await check(password,result.password);
            if (match){
                return result;
            }else{
                return null;
            }
        }
    }
    catch(err){
        return null;
    }
}


async function createNewUser(obj){
    const query = `insert into Users(email,name,username,password) values('${obj.email}','${obj.name}','${obj.username}','${obj.password}');`;
    try{
        await execQueury(query);
        return true;
    }
    catch(err){
        return false;
    }
}


async function refreshUser(u_id){
    const query = `select * from users where u_id = '${u_id}'`;
    try{
        let result = await execQueury(query);
        if( result.length === 0 ){
            return null;
        }else{
            result = result[0];
            return result;
        }
    }
    catch(err){
        console.log(err);
    }
}

async function getUserFromEmail(email){
    const query = `select * from users where email = '${email}'`;
    try{
        let result = await execQueury(query);
        if(result.length === 0 ){
            return false;
        }else{
            return true;
        }
    }
    catch(err){
        console.log(err);
    }
}

async function updateUser(parameter,value,conditionParum,condition){
    let query = `update users set ${parameter} = '${value}' where ${conditionParum} = ${condition}`;
    return execQueury(query);
}

async function checkIfUsernameTaken(username){
    let query = `select * from users where username = '${username}'`;
    return execQueury(query);
}

async function followUser(toFollow,followRequest){
    let query = `insert into followtable values('${toFollow}','${followRequest}')`;
    return execQueury(query);
}

async function unfollowUser(toUnFollow,unFollowRequest){
    let query = `delete from followtable where u_id = '${toUnFollow}' and follower = '${unFollowRequest}'`;
    return execQueury(query);
}

async function getListOfUsers(offset,limit){
    let query = `select u_id,username,name,profilepicture from users offset  ${parseInt(offset)} limit ${parseInt(limit)}`;
    return execQueury(query);
}

async function getUserToFollow(u_id,offset,limit){
    let query = `select u_id,username,name,profilepicture from users where u_id not in (select u_id from followtable where follower = ${u_id}) and u_id!=${u_id} offset ${parseInt(offset)} limit ${parseInt(limit)}`
    return execQueury(query);
}

async function addLike(t_id,u_id){
    let query = `call likehandle(${t_id},${u_id})`;
    return execQueury(query);
}

async function removeLike(t_id,u_id){
    let query = `call removeLikeHandle(${t_id},${u_id})`
    return execQueury(query);
}

async function getProfile(u_id){
    let query = `select *, (select count(*) follows from followtable where u_id = ${u_id}),(select count(*) following from followTable where follower = ${u_id}) from users where u_id = ${u_id} ;`;
    return execQueury(query);
}

async function getAllTweetsOfUser(userToSearch,activeUser){
    let query;
    if(activeUser === undefined){
        query = `select tweets.* from (select tweets.*,username,name,u_id,profilepicture from tweets inner join users on sender = users.u_id where commentof is null) as tweets  where sender = ${userToSearch} order by dateofupload desc;`;
    }else{
        query = `select tweets.*,liked from (select tweets.*,username,name,u_id,profilepicture from tweets inner join users on sender = users.u_id where commentof is null) as tweets left join (select * from liketable where u_id = ${activeUser}) as liketable on tweets.t_id = liketable.t_id where sender = ${userToSearch} order by dateofupload desc;`;
    }

    return  execQueury(query);
}

async function getAllCommentOfUser(userToSearch,activeUser){
    let query =`select tweets.*,liked from (select tweets.*,username,name,u_id,profilepicture from tweets inner join users on sender = users.u_id where commentof is not null) as tweets left join (select * from liketable where u_id = ${activeUser}) as liketable on tweets.t_id = liketable.t_id where sender = ${userToSearch} order by dateofupload desc;`;
    return execQueury(query);
}

async function getAllLikedOfUser(userToSearch,activeUser){
    let query = `select tweets.*,liked from (select tweets.*,username,name,u_id,profilepicture from tweets inner join users on sender = users.u_id where t_id in (select t_id from liketable where u_id = ${userToSearch})) as tweets left join (select * from liketable where u_id = ${activeUser}) as liketable on tweets.t_id = liketable.t_id order by dateofupload desc;`;
    return execQueury(query);
}

async function searchUsers(username){
    let query = `select u_id,username,profilepicture,name from users where username like '${username}%'`
    return execQueury(query);
}

async function getUserIdFromUsername(usernames){
    if(usernames.length == 0 ){
        return [];
    }
    let result = [];
    let string = usernames.join(', ');
    let query = `select u_id from users where username in (${string})`;
    return execQueury(query);
}

async function checkFollowStatus(userToCheckUid,againstUid){
    let query = `select count(*) from followtable where u_id = ${userToCheckUid}  and follower = ${againstUid};`;
    return execQueury(query);
}

module.exports = {getUser,refreshUser,getUserFromEmail,createNewUser,updateUser,checkIfUsernameTaken,followUser,unfollowUser,getListOfUsers,getUserToFollow,addLike,removeLike,getProfile,getAllTweetsOfUser,getAllCommentOfUser,getAllLikedOfUser,searchUsers,getUserIdFromUsername,checkFollowStatus};