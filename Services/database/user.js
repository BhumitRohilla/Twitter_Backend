const execQueury = require('./connection');
const bcrypt = require('bcrypt');


async function getUser(userName,password){
    const query = `select * from Users where userName = '${userName}'`;
    try{
        let result = await execQueury(query);
        if(result.length === 0 ){
            return null;
        }else{
            result = result[0];
            return await bcrypt.compare(password,result.password);
        }
    }
    catch(err){
        console.log(err);
    }
}



module.exports = {getUser};