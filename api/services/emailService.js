const createTransporter = require('../config/emailConfig');

const sendVerificationEmail = async (recipientEmail, verificationCode) => {
  try {
    const transporter = await createTransporter();
    const mailOptions = {
      from: 'Boss Game <toanvippk115@gmail.com>',
      to: recipientEmail,
      subject: 'Account verification',
      text: `Your verification code is: ${verificationCode}`,
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    return null;
  }
};


module.exports = {
    sendVerificationEmail,
};
