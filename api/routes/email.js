const express = require('express');

const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send/:userEmail', (req, res) => {
  const userEmail = req.params.userEmail;
  const planToSend = req.body;
  // console.log('user email', userEmail);

  let output = `
  <h3>Trip Name: ${planToSend.name}</h3>
    <p>City: ${planToSend.city}</p>
  `;

  // sort days by date and go through the places

  let sortDays = planToSend.days.slice().sort((a, b) => {
    a = a.date.split('/').reverse().join('');
    b = b.date.split('/').reverse().join('');
    return a > b ? 1 : a < b ? -1 : 0;
  });

  sortDays.forEach((day) => {
    let tripData = `<br>
      <h5>Date: ${day.date}</h5>`;
    day.places.forEach((place) => {
      let placeInDay = '<ul>';
      for (let prop in place) {
        if (place.hasOwnProperty(prop)) {
          if (prop !== 'type' && prop !== 'id' && prop !== 'position' && prop !== 'iternalId' && prop !== 'photo') {
            let item = `<li><u>${prop}</u>: ${place[prop]}</li>`;
            placeInDay += item;
          }
        }
        // tripData += placeInDay;
      }
      tripData += `${placeInDay}</ul><br>`;
      // const tripData = `
      //     <br>
      //     <li>Date: ${day.date}</li>
      //     <li>Name: ${place.name}</li>
      //     <li>Type: ${place.type}</li>
      //     <li>Category: ${place.category}</li>
      //     <li>Duration: ${place.duration}</li>
      //     <li>Phone: ${place.phone}</li>
      //     <li>Address: ${place.address}</li>
      //     <li>Description: ${place.description}</li>
      //   </ul>
      // `;


    });
    output += tripData;
  });

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
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: 'Triplan <triplancontact@gmail.com>',
    to: userEmail,
    subject: 'Your Planed Trip ✔',
    // text: 'hi',
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

  res.send('email sent');
});
// });

module.exports = router;
