const { execQueury } = require("./connection");

async function sendTweet(uId,text,img){
    let query = `insert into tweets (sender,text,img,dateOfUpload,view,likes,retweet,quote,active) values(${uId}, '${text}', '${img}', current_timestamp , 0 , 0 , false, false, 't');`;
    return execQueury(query);
}


async function getFollowTweet(uId,offset,limit){
    let query = `select tweets.*,users.username,users.profilepicture from (select * from tweets where sender  = ${uId} union select * from tweets where sender in (select follower from followTable where followTable.u_id = tweets.sender) offset ${offset} limit ${limit}) as tweets inner join users on tweets.sender = users.u_id order by dateOfUpload;`;
    return execQueury(query);
}

module.exports = {sendTweet,getFollowTweet};

