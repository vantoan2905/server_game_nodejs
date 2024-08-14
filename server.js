// const https = require('node:https');
// const fs = require('node:fs');
// const app = require('./app'); 

// const hostname = '127.0.0.2'; // Use '127.0.0.2' for local testing, and 0.0.0.0 for production 

// // Read SSL certificates
// const options = {
//   key: fs.readFileSync('private-key-no-passphrase.pem'), // Use the key without passphrase
//   cert: fs.readFileSync('public-cert.pem')
// };

// // Define routes
// app.get('/', (req, res) => {
//   res.send('Hello HTTPS!');
// });

// // Create HTTPS server
// https.createServer(options, app).listen(8000, hostname, () => {
//   console.log(`Server is running on https://${hostname}:8000`);
// });



const https = require('node:https');
const fs = require('node:fs');
const app = require('./app');
const socketIo = require('socket.io');

const hostname = '127.0.0.2'; // Use '127.0.0.2' for local testing, and 0.0.0.0 for production 

// Read SSL certificates
const options = {
  key: fs.readFileSync('private-key-no-passphrase.pem'), // Use the key without passphrase
  cert: fs.readFileSync('public-cert.pem')
};

// Create HTTPS server
const server = https.createServer(options, app);

// Initialize socket.io with the HTTPS server
const io = socketIo(server);

// Define socket.io behavior
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(8000, hostname, () => {
  console.log(`Server is running on https://${hostname}:8000`);
});
