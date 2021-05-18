const nodemailer = require("nodemailer");
require("dotenv").config();

const EmailTemplate = {
  BOOKING_CONFIRMATION_CONSUMER: "booking_confirmation_consumer",
  BOOKING_CONFIRMATION_PROVIDER: "booking_confirmation_provider",
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

const resolveTemplate = (template, formData, receipt) => {
  const { name, lastName, email, reservationDetails } = formData;
  //   const { stripeConfirmation: attachment } = receipt; // replace w/ the actual response property

  switch (template) {
    case EmailTemplate.BOOKING_CONFIRMATION_CONSUMER:
      return {
        from: process.env.EMAIL_SENDER_USERNAME, // sender address
        to: email, // list of receivers
        subject: "Your booking confirmation",
        text: "Please find your reservation details and receipt below",
        html: `
        <b>Hey there, ${name} ${lastName}!</b> 
        <br>Here are your reservation details and receipt attached<br/>
        <p>${reservationDetails.date}</p>
        <p>${reservationDetails.address}</p>
        `,
        // TODO: handle receipt attachment
      };

    case EmailTemplate.BOOKING_CONFIRMATION_PROVIDER:
      return {
        from: process.env.EMAIL_SENDER_USERNAME, // sender address
        to: email, // list of receivers
        subject: "Your parking lot has been reserved!",
        text: "Please find the reservation details and receipt below",
        html: `
        <b>Hey there, ${name} ${lastName}!</b> 
        <br>Here are your reservation details and receipt attached<br/>
        <p>${reservationDetails.date}</p>
        <p>${reservationDetails.address}</p>
        `,
      };
  }
};

// const sendEmail = (template, formData, receipt) => {
  const sendEmail = (template, formData, receipt) => {
  const emailTemplate = resolveTemplate(template, formData, receipt);
  transporter.sendMail(emailTemplate, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

module.exports = { sendEmail, EmailTemplate };
