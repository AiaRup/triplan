const express = require('express');

const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send/:userEmail', (req, res) => {
  const userEmail = req.params.userEmail;
  const planToSend = req.body;
  console.log('user email', userEmail);
  console.log('plan to send', JSON.stringify(planToSend));

  const output = `
  <h3>Trip Name: ${planToSend.name}</h3>
  <li>City: ${planToSend.city}</li>
  
  `;


  const transporter = nodemailer.createTransport({
      service: 'gmail',
       auth: {
        type: 'OAuth2',
        // xoauth2: xoauth2.createXOAuth2Generator({
        user: 'triplancontact@gmail.com',
        clientId: '423911866308-br8ee6q56lsm4cj79e4rv2v4219f116l.apps.googleusercontent.com',
        clientSecret: 'C2QOP-_B7YfWoefDYFPtPTxD',
        refreshToken: '1/-fe4zyKVTzDbzP1CiTGKRmiSZuR68Xt9Rgr_DYrHOs4',
        accessToken: 'ya29.GlspBrjGIeD6BFdviiske_d9pzOfokBC472dd9m2iPJCH-e69cwLfjXF4Yv0f2lSB9BwyWdstcTxIzMAEY7eFeaUr5HKtE4JM4Qay5Fqu5jg-p7s8KKEfXK3ch5O',
    // })
        },
        tls: {
          rejectUnauthorized: false,
        }
  });

  const mailOptions = {
      from: 'Triplan <triplancontact@gmail.com>',
      to: userEmail,
      subject: 'Your Planed Trip ✔',
      text: 'hi',
      html: output,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
});
// });

module.exports = router;
