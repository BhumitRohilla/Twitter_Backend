const Pool = require('pg').Pool;

const pool = new Pool({
    user:'testd',
    host:'localhost',
    database:'twitter_trial',
    password:'test',
    port:5432,
})


async function execQueury(query){
    const client = await pool.connect();
    try{
        let result = await client.query(query);
        return (result.rows);
    }
    catch(err){
        throw new Error(err.error);
    }finally{
        client.release();
    }
}

module.exports = {execQueury};