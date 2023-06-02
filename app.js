const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const accountSid = 'AC3406556063cce5ee76e96d729013104f';
const authToken = '64f25255a232e55c71ded241354cabe8';
const twilioNumber = 'whatsapp:+12542685301';

const client = twilio(accountSid, authToken);
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/whatsapp', (req, res) => {
  const sender = req.body.From;
  const message = req.body.Body;


  const response = 'Thank you for your message!';  

  client.messages.create({
    body: response,
    from: twilioNumber,
    to: sender
  }).then(() => {
    res.status(200).end();
  }).catch((err) => {
    console.error('Error while sending reply:', err);
    res.status(500).end();
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
