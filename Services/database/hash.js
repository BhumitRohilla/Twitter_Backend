// import { execQueury } from "./connection";
const {execQueury} = require('../database/connection')

function getAllHash(){
    let queury = `select * from hashtag order by count;`;
    return execQueury(queury);
}

module.exports = {getAllHash};