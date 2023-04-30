const crypto = require('crypto');

function validUserName(userName){
    const userRejex = /^[a-zA-Z_]+$/;
    return userRejex.test(userName);
}


function validPassword(password){
    const passwordRejex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
    return passwordRejex.test(password);
}

function validEmail(email){
    const emailRejex = /^[a-zA-Z0-9]+@[a-z]+.com$/;
    return emailRejex.test(email);
}

function makeValidUserName(name){
    let newStr=(name)+crypto.randomBytes(5).toString('hex');
    return newStr.replace(/[^a-zA-Z0-9]/g, '');
}

function checkIfAllAreValid(user){
    if(!(validUserName(user.username) && validPassword(user.password) &&  validEmail(user.email))){
        return true;
    }else{
        return false;
    }
}

function getMentions(text){
    let mentionsRejex = /(^|(?<=\s))@\w+/g;
    let mentions = text.match(mentionsRejex);

    if(mentions === null ){
        return [];
    }

    mentions = mentions.map((element)=>{
        return `'${element.substring(1)}'`;
    })

    return  mentions;
}

module.exports={validEmail,validUserName,validEmail,makeValidUserName,checkIfAllAreValid,getMentions};