const express = require('express');
const { sendEmailNotification } = require('./emailService');

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { recipientEmail, subject, message } = req.body;

  try {
    await sendEmailNotification(recipientEmail, subject, message);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

module.exports = router;
