var nodemailer = require('nodemailer');


const hbs=require('nodemailer-express-handlebars');

module.exports.RegMail = (email,subject, body,template)=>{
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'BestifyYourTime@outlook.com',
      pass: 'Bestify@123'
    }
  });
  
  const handlebarOptions = {
    viewEngine: {
      extName: '.html',
      partialsDir: 'templates',
      layoutsDir: 'templates',
      defaultLayout: '',
    },
    viewPath: '',
    extName: '.html',
  };
transporter.use('compile', hbs(handlebarOptions));

const mailOptions = {
  from: 'BestifyYourTime@outlook.com',
  to: email,
  subject: subject,
  text: body,
  template:template
};


transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });




}
