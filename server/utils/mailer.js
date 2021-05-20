const nodemailer = require("nodemailer");
require("dotenv").config();

const EmailTemplate = {
  BOOKING_CONFIRMATION_CONSUMER: "booking_confirmation_consumer",
  BOOKING_CONFIRMATION_PROVIDER: "booking_confirmation_provider",
};

const formattedDate = (startDate) => {
  let date = new Date(parseInt(startDate));
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// Email configuration
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_SENDER_USERNAME,
    pass: process.env.EMAIL_SENDER_PASSWORD,
  },
  secure: true,
});

const resolveTemplate = (template, args) => {
  const { firstName, lastName, email, startDate, address, stripeSessionId: confirmationNumber } = args;

  switch (template) {
    case EmailTemplate.BOOKING_CONFIRMATION_CONSUMER:
      return {
        from: process.env.EMAIL_SENDER_USERNAME, // sender address
        to: email, // list of receivers
        subject: "Your booking confirmation",
        text: "Please find your reservation details below",
        html: `
        <h2>Hey there, ${firstName} ${lastName}!</h2> 
        <br>Here are your reservation details<br/>
        <p>${formattedDate(startDate)}</p>
        <p>${address}</p>
        <br>Your confirmation number is: ${confirmationNumber}</br>
        `,
      };

    case EmailTemplate.BOOKING_CONFIRMATION_PROVIDER:
      return {
        from: process.env.EMAIL_SENDER_USERNAME, // sender address
        to: email, // list of receivers
        subject: "Your parking lot has been reserved!",
        text: "Please find the reservation details and receipt below",
        html: `
        <b>Hey there, ${firstName} ${lastName}!</b> 
        <br>Here are your reservation details and receipt attached<br/>
        <p>${formattedDate(startDate)}</p>
        <p>${address}</p>
        `,
      };
  }
};

// const sendEmail = (template, formData, receipt) => {
const sendEmail = (template, args) => {
  const emailTemplate = resolveTemplate(template, args);
  transporter.sendMail(emailTemplate, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

module.exports = { sendEmail, EmailTemplate };
