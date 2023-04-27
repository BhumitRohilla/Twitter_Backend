const MailApi = require('./MailApi');

function sendVarificationMain(to,otp){
    return MailApi(to,'Otp for twitter','This is a text',
        `<div style="width:400px;height:fit-content;background-color:#f1f1;margin:30px auto;">
            <h3>Confirm your email address </h3>
            <p>There's one quick step you need to complete before creating your Twitter account. Let's make sure this is the right email address for you — please confirm this is the right address to use for your new account.</p>
            <p>Please enter this verification code to get started on Twitter:</p>
            <h1 style="margin:0px">${otp}</h1>
            <p>Verification codes expire after 15min</p>
            <br/>
            <p style="margin:0px">Thanks,</p>
            <p style="margin:0px">Twitter</p>
        </div>`
    );
}
module.exports = sendVarificationMain;