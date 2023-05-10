const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "cletus24@ethereal.email", // generated ethereal user
    pass: "TB26J3jsjp61FBfv55", // generated ethereal password
  },
});

const sent = async (info) => {
  try {
    // console.log(info);
    let result = await transport.sendMail(info);
    console.log("Message sent: %s", result.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
  } catch (error) {
    console.log(error);
  }
};

const emailProcess = (email, pin) => {
  const info = {
    from: '"Amrinder Singh👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Reset Password PIN ", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello</b>" + email + "your reset pin is " + pin, // html body
  };

  sent(info);
};

module.exports = {
  emailProcess,
};
