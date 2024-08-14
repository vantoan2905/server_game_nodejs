const { google } = require("googleapis");
const nodemailer = require("nodemailer");
require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });


/**
 * Creates a transporter for sending emails using the Gmail service with OAuth2 authentication.
 *
 * @returns {Promise<object>} A Promise that resolves to the transporter object.
 */
const createTransporter = async () => {
    // Get the access token from the OAuth2 client
    const accessToken = await oAuth2Client.getAccessToken();

    // Create the transporter with the Gmail service and OAuth2 authentication
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2", // Use OAuth2 authentication
            user: process.env.EMAIL_USER, // Email user
            clientId: process.env.CLIENT_ID, // Client ID from Google Cloud Console
            clientSecret: process.env.CLIENT_SECRET, // Client secret from Google Cloud Console
            refreshToken: process.env.REFRESH_TOKEN, // Refresh token
            accessToken: accessToken, // Access token obtained from OAuth2 client
        },
        tls: {
            rejectUnauthorized: false, // Disable TLS certificate verification
        },

    });

    return transporter;
};

module.exports = createTransporter;
