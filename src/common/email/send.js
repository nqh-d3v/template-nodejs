const nodemailer = require('nodemailer');
const mailAccount = require('../../../configs/email').acc;

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: mailAccount.hst,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: mailAccount.usr, // email user
    pass: mailAccount.pwd, // email password
  },
});

async function passwordResetEmail(recipent, resettoken) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"SMT - Student Management System" <no-reply@toladev.info>', // sender address
    to: recipent, // list of receivers
    subject: 'Password Reset', // Subject line
    text:
            `${`${
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                + 'Please click on the following link, or paste this into your browser to complete the process:\n\n'
            }${
              process.env.REDIRECT_RESET_PASSWORD_URL
                || 'http://localhost:4200/response-reset-password/'
            }`}${resettoken}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n', // plain text body
  });

  console.log('Message sent: %s', info.messageId);
}

async function codeValidateEmail(code, recipent, purpose) {
  const content = `Your code for '${purpose}' is <b>${code}</b>`;
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"SMan - Student Management" <no-reply@toladev.info>', // sender address
    to: recipent, // list of receivers
    subject: 'Verification code', // Subject line
    html: content,
  });

  console.log('Message sent: %s', info.messageId);
}

async function infoCreateAccountEmail(infoU) {
  const content = `You created an account on Student Management.<br>
    Your username: <b>${infoU.userCode}</b><br>
    Your password: <b>${infoU.password}</b><br>
  `;
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"SMan - Student Management" <no-reply@toladev.info>', // sender address
    to: infoU.email, // list of receivers
    subject: 'Your account information', // Subject line
    html: content,
  });

  console.log('Message sent: %s', info.messageId);
}

module.exports = {
  passwordResetEmail,
  codeValidateEmail,
  infoCreateAccountEmail,
};
