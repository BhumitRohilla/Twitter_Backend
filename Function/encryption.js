const bcrypt = require('bcrypt');


function encrypt(data){
    return bcrypt.hash(data,parseInt(process.env.SALTROUND));
}

function check(data,bcryptedData){
    return bcrypt.compare(data,bcryptedData);
}

module.exports = {encrypt,check};