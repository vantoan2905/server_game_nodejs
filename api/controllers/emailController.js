const transporter = require('../services/emailService');

/**
 * Sends a verification email to the specified email address.
 *
 * @param {string} email - The email address to send the verification email to.
 * @returns {Promise<string>} - A promise that resolves with a success message if the email is sent successfully,
 *                              or an error message if the user is not found.
 */
const sendMail = async (email) => {
    
    // Generate a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    // Send the verification email
    const result = await transporter.sendVerificationEmail( email, verificationCode);
    // Check if the email was sent successfully
    if (!result) {
        return 'Failed to send verification email';
    }else{
        return ['Verification email sent', verificationCode];  
    }
   
};

module.exports = { sendMail };