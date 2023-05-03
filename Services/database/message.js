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
    let queury = `select users.u_id,users.name,users.username,users.profilepicture,users.email from (
        select max(timeofpost) as timeofpost ,u_id from (	
        select max(timeofpost) as timeofpost, sender as u_id from messages group by (sender,receiever) having receiever = ${u_id}
        union
        select max(timeofpost) as timeofpost, receiever as u_id from messages group by (sender,receiever) having sender= ${u_id}
            ) as myTable
        group by u_id
            ) as myTable inner join users on myTable.u_id = users.u_id order by timeofpost desc;`;
    return execQueury(queury);
}

module.exports={getAllMessages,insertMessage,getUserToConvo}