const { execQueury } = require("./connection")

//TODO: Check this query
function getAllMessages(u_id1,u_id2){
    let queury = `select * from (select distinct on (convo_id) * from (select * from messages where sender = ${u_id1} and receiever = ${u_id2} union select * from messages where receiever = ${u_id1} and sender = ${u_id2}) as messages) as messages order by  timeofpost;`;
    return execQueury(queury);
}

function insertMessage(sender,receiver,message){
    let queury = `insert into messages(sender,receiever,message) values(${sender},${receiver},'${message}') returning convo_id;`
    return execQueury(queury);
}

function getUserToConvo(u_id){
    let queury = `select u_id,username,profilepicture,email,name from users where u_id in (select distinct u_id from (select sender as u_id from messages where receiever = ${u_id} union select receiever as u_id from messages where sender = ${u_id}) as usersToShow);`;
    return execQueury(queury);
}

module.exports={getAllMessages,insertMessage,getUserToConvo}