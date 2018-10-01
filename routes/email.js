const express = require('express');
const router = express.Router();

router.post('/send/:userEmail', (req, res) => {
  const userEmail = req.params.userEmail;
  const planToSend = req.body;
  console.log('user email', userEmail);
  console.log('plan to send', planToSend);
});

module.exports = router;