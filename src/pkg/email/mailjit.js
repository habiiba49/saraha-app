import Mailjet from 'node-mailjet'
export class MailjetProvider{
    client;
    fromEmail; 
    fromName; 

    constructor(config){
        this.client = new Mailjet({
            apikey: config.apikey, 
            apisecret:config.apisecret
        });
        this.fromName = config.fromName;
        this.fromEmail = config.fromEmail;

    }
       async SendMail (email, subject ,html ){
             this.client.post('send', { version: 'v3.1' }).request({
  Messages: [
    {
      From: {
        Email: this.fromEmail,
        Name: this.fromname,
      },
      To: [
        {
          Email: email,
        },
      ],
      Subject: subject ,
      HTMLPart: html,
    },
  ],
})
request
  .then(result => {
    console.log(result.body)
  })
  .catch(err => {
    console.log(err.statusCode)
  })


        }
    }
