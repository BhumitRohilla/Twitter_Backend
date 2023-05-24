// import { execQueury } from "./connection";
const {execQueury} = require('../database/connection')

function getAllHash(){
    let queury = `select * from hashtag order by count;`;
    return execQueury(queury);
}

function searchHash(text){
    let queury = `select * from hashtag where text like '${text}%'`;
    return execQueury(queury);
}

async function addToHash(t_id,hash){
    console.log(t_id,hash);
    
    for(let i=0;i<hash.length;++i){
        let queury = `insert into hashtag(text) values('${hash[i]}');`;
        try{
            await execQueury(queury);
        }
        catch(err){
            continue;
        }
    }
    for(let i=0;i<hash.length;++i){
        let queury = `update hashtag set count = ((select count from hashtag where text='${hash[0]}') +1) where text='${hash[0]}';`
    
    }

   return  ;
}

module.exports = {getAllHash,searchHash,addToHash};