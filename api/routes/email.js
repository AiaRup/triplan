// const express = require('express');

// const router = express.Router();

// const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars');
// const path = require('path');
// const nodemailer = require('nodemailer');


// // router.set('views', path.join(__dirname, 'views'));
// // router.engine('html', require('ejs').renderFile);

// // router.set('view engine', 'html');


// // const router = express();

// // View engine setup
// // router.engine('handlebars', exphbs());
// // router.set('view engine', 'handlebars');

// // Static folder
// router.use('./client/src/component/app', express.static(path.join(__dirname, 'app')));

// // Body Parser Middleware
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

// router.get('/', (req, res) => {
//   res.render('contact');
// });

// router.post('/email/send', (req, res) => {
//   const output = `
//     <p>You have a new contact request</p>
//     <h3>Contact Details</h3>

//   `;

//   // nodemailer.createTestAccount((err, account) => {
//   //   // create reusable transporter object using the default SMTP transport
//   //   let transporter = nodemailer.createTransport({
//   //       host: 'smtp.ethereal.email',
//   //       port: 587,
//   //       secure: false, // true for 465, false for other ports
//   //       auth: {
//   //           user: account.user, // generated ethereal user
//   //           pass: account.pass // generated ethereal password
//   //       }
//   //   });

//   // })

//   // // create reusable transporter object using the default SMTP transport
//   const transporter = nodemailer.createTransport({
//     host: 'gmail',
//     port: 25,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: 'drordvash4@gmail.com',
//       pass: 'Zv nh atbh2973' // generated ethereal password
//     },
//     tls:{
//       rejectUnauthorized: false,
//     }
//   });

//   // setup email data with unicode symbols
//   const mailOptions = {
//       from: '"Nodemailer Contact" <your@email.com>', // sender address
//       to: 'drordvash4@gmail.com', // list of receivers
//       subject: 'Node Contact Request', // Subject line
//       text: 'Hello world?', // plain text body
//       html: output // html body
//   };

//   // send mail with defined transport object
//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           return console.log(error);
//       }
//       console.log('Message sent: %s', info.messageId);   
//       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//       res.render('contact', { msg: 'Email has been sent'});
//   });
// });

// // ---------------------------------------------------------------------------------
// const express = require('express');

// const router = express.Router();

// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');


// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

// router.post('/api/email', (req, res) => {
//   nodemailer.createTestAccount((err, account) => {
//     const htmlEmail = `
//     <h3>Contact Details</h3>
//       <ul>
//         <li>Name: dror</li>
//         <li>Email: some email</li>
//       </ul>
//       <h3>Message</h3>
//     `


//   })

//   // nodemailer.createTestAccount((err, account) => {
//   //   // create reusable transporter object using the default SMTP transport
//   //   let transporter = nodemailer.createTransport({
//   //       host: 'smtp.ethereal.email',
//   //       port: 587,
//   //       secure: false, // true for 465, false for other ports
//   //       auth: {
//   //           user: account.user, // generated ethereal user
//   //           pass: account.pass // generated ethereal password
//   //       }
//   //   });

//   // })

//   // // create reusable transporter object using the default SMTP transport
//   const transporter = nodemailer.createTransport({
//     host: 'gmail',
//     port: 25,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: 'drordvash4@gmail.com',
//       pass: 'Zv nh atbh2973' // generated ethereal password
//     },
//     tls:{
//       rejectUnauthorized: false,
//     }
//   });














// module.exports = router;

