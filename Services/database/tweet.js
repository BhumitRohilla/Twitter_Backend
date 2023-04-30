const { execQueury } = require("./connection");

async function sendTweet(uId,text,img,commentof = null){
    let query = `insert into tweets (sender,text,img,dateOfUpload,view,likes,retweet,quote,active,commentof) values(${uId}, '${text}', '${img}', current_timestamp , 0 , 0 , false, false, 't',${commentof}) RETURNING t_id;`;    
    return execQueury(query);
}

async function getTweet(t_id,u_id){
    let query = `select tweets.*,likeTable.liked from (select tweets.*,users.username,users.profilepicture,users.u_id from tweets inner join users on users.u_id = tweets.sender where t_id = ${t_id}) as tweets left join liketable on tweets.t_id = likeTable.t_id and likeTable.u_id = ${u_id}`;
    return execQueury(query);
}

async function getFollowTweet(uId,offset,limit){
    let query = `select tweets.*,likeTable.liked from (select tweets.*,users.name,users.username,users.profilepicture,users.u_id from (select * from tweets where sender  = ${uId} union select * from tweets where sender in (select u_id from followTable where follower = ${uId}) offset ${offset} limit ${limit}) as tweets inner join users on tweets.sender = users.u_id order by dateOfUpload desc) as tweets left join liketable on tweets.t_id = likeTable.t_id and likeTable.u_id = ${uId} order by dateofupload desc;`;
    return execQueury(query);
}

async function addToMentionTable(t_id,u_ids){
    if(u_ids.length === 0 ){
        return ;
    }
    let query = `insert into mentions values`;
    query = query + u_ids.reduce((prev,current)=>{
        return (prev+= `(${t_id},${current.u_id}),`);
    },'')
    query = query.substring(0,query.length-1);
    return execQueury(query);
}

//!DEPRECIATED
async function sendComment(commentOf,uId,text,img){
    let query = `insert into tweets (commentof,sender,text,img,dateOfUpload,view,likes,retweet,quote,active) values(${commentOf},${uId}, '${text}', '${img}', current_timestamp , 0 , 0 , false, false, 't');`
    return execQueury(query);
}

async function getAllCommentTweet(t_id,u_id){
    let query =`select tweets.*,likeTable.liked from (select tweets.*,users.username,users.profilepicture,users.u_id from  tweets inner join users on tweets.sender = users.u_id where commentof= ${t_id} )as tweets left join liketable on tweets.t_id = likeTable.t_id and likeTable.u_id = ${u_id} order by dateofupload desc;`
    return execQueury(query);
}

module.exports = {sendTweet,getFollowTweet,getTweet,sendComment,addToMentionTable,getAllCommentTweet};

