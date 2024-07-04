const createTransporter = require('../config/emailConfig');

/**
 * Sends a verification email to the specified email address.
 *
 * @param {string} email - The email address to send the verification email to.
 * @param {string} verificationCode - The verification code to include in the email.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 * @throws {Error} - If there is an error sending the email.
 */
const sendVerificationEmail = async (email, verificationCode) => {
    try {
        // Create a transporter instance
        const transporter = await createTransporter();

        // Define the mail options
        const mailOptions = {
            from: {
                name: "Boss Game",
                address: "toanvippk115@gmail.com"
            },
            to: email,
            subject: 'Xác thực tài khoản của bạn',
            text: `Mã xác thực của bạn là: ${verificationCode}`,
        };

        // Send the email and log the result
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info);
        return info;
    } catch (error) {
        // Log any errors that occur during email sending
        console.error('Error sending email:', error);
        return null;
    }
};

module.exports = {
    sendVerificationEmail,
};
