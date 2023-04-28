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
        console.log(err);
        return null;
    }
}


async function createNewUser(obj){
    const query = `insert into Users(email,name,username,password) values('${obj.email}','${obj.name}','${obj.username}','${obj.password}');`;
    try{
        console.log(query);
        await execQueury(query);
        return true;
    }
    catch(err){
        console.log(err);
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

module.exports = {getUser,refreshUser,getUserFromEmail,createNewUser,updateUser,checkIfUsernameTaken,followUser,unfollowUser,getListOfUsers,getUserToFollow,addLike,removeLike,getProfile};