# NGL APP [anonymous-messaging-app]
* send anonymous messages or public messages , view profile with messages.
* handle mannage messages. 

- tech stack : 
    - express
    - javascript 
    - mongodb/mongoose 
    - redis [cashing]
    - nodemailer[email]
    - jwt [authentication]
    - bcrypt [password hash]
    - oauth [goagle]
    - validation[zod,joi,yup,class-validator]

- features: 
    -authentication flow: 
      - register 
      - verify email using OTP 
      -  login. 
      - rest password 
      - send OTP 
      - login with Goagle 
      - logout

- message flow:
      - send message [anonymous - public]
      - view message 
      - delete message [soft-delete/archive]

- user flow [me] : 
      - view profile 
      - edit profile 
      - delete profile 

-  tech stack:
      - express
      - javascript
      - mongodb/mongoose
      - redis [caching]
      - nodemailer [email]
      - jwt [authentication]
      - bcrypt [password hash]
      - oauth2 [google]
      - validation [Zod, Joi, Yup, class-validator]


- OTP:
     - delete OTP after 10 min.
     - delete OTP after usage.
     - store OTP temporarily:[time to live]
     - database using mongodb support TTL.[HDD]
     - into cache redis support TTL.[ram] x50 faster more DB.


-  features:
     - authentication flow:
     - register
     - verify email using OTP.
     - login



      