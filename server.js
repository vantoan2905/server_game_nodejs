const https = require('node:https');
const fs = require('node:fs');
const app = require('./app'); 

const hostname = '0.0.0.0'; // Use '127.0.0.2' for local testing

// Read SSL certificates
const options = {
  key: fs.readFileSync('private-key-no-passphrase.pem'), // Use the key without passphrase
  cert: fs.readFileSync('public-cert.pem')
};

// Define routes
app.get('/', (req, res) => {
  res.send('Hello HTTPS!');
});

// Create HTTPS server
https.createServer(options, app).listen(3000, hostname, () => {
  console.log(`Server is running on https://${hostname}:3000`);
});
