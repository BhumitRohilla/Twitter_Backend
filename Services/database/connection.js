const Pool = require('pg').Pool;

const pool = new Pool({
    user:'test',
    host:'localhost',
    database:'twitter_trial',
    password:'test',
    port:5432,
})


async function execQueury(query){
    try{
        const client = await pool.connect();
        try{
            let result = await client.query(query);
            return (result.rows);
        }
        catch(err){
            throw new Error(err);
        }finally{
            client.release();
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {execQueury};