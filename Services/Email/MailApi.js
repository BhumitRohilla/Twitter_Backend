const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports=function(to,subject,text,html){
    const msg = {
      to: to, // Change to your recipient
      from: 'bhumit73rohilla@gmail.com', // Change to your verified sender
      subject: subject,
      text: text,
      html: html
    }
    
    return sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
        return response.statusCode;
      })
      .catch((error) => {
        console.error(error)
        throw new Error(error);
      })
}