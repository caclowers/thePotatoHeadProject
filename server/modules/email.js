const nodemailer = require('nodemailer');
const Email = require('email-templates');


// module.exports = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  }, 
  // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    // auth: {
    //     type: 'OAuth2',
    //     user: process.env.CLIENT_USER,
    //     clientId: process.env.CLIENT_ID,
    //     clientSecret: process.env.CLIENT_SECRET,
    //     refreshToken: process.env.CLIENT_REFRESHTOKEN,
    //     accessToken: process.env.CLIENT_ACCESSTOKEN,
    // },
});

const email = new Email({
  message: {
      from: process.env.EMAIL_USERNAME
  },
  send: true,
  htmlToText: false,
  preview: false,
  transport: transporter
});

const adminEmail = new Email({
  message: {
      from: process.env.CLIENT_USER
  },
  send: true,
  htmlToText: false,
  preview: false,
  transport: transporter
});

const emailWithPreview = new Email({
    message: {
        from: process.env.EMAIL_USERNAME
    },
    send: true,
    htmlToText: false,
    transport: transporter
});

module.exports = {
    email : email,
    emailWithPreview : emailWithPreview,
    adminEmail: adminEmail
}