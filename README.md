## Introduction
Welcome to the Node.js Project! This project serves as a template for building robust and scalable Node.js applications. The project is designed to provide a clean and organized structure for developing server-side applications.

## Project Structure
bash

D:\Nodejs\server_game_nodejs
- │
- ├── .dockerignore          # Files to ignore in Docker builds
- ├── .env                   # Environment variables
- ├── .gitignore             # Files to ignore in git version control
- ├── api/                   # API route handlers
- ├── app.js                 # Main application file
- ├── Dockerfile             # Docker configuration file
- ├── node_modules/          # Node.js modules
- ├── package-lock.json      # Lock file for npm dependencies
- ├── package.json           # Project metadata and dependencies
- ├── README.md              # Project documentation
- ├── server.js              # Server configuration and initialization
- └── other_files_and_directories  # Other relevant files and directories
## Getting Started
1. Prerequisites
Node.js
npm
Docker (optional, for containerization)
2. Installation
Clone the repository:

```bash

git clone https://github.com/vantoan2905/server_game_nodejs.git
cd server_game_nodejs
```
3. Install dependencies:
```bash

npm install
```
4. Set up environment variables:

Create a .env file in the root directory and configure the necessary variables.
Running the Server
5. To start the server, run:

```bash

node app.js
```

## Project Details
## API Endpoints
### userController routes
- /users
- /users/getUser
- /users/addUser
- /users/forgotPassword
- /users/resetPassword
- /users/friendList

### characterController routes
- /characters
- /characters/getCharacter
- /characters/addCharacter
- /characters/updateCharacter
- /characters/deleteCharacter

### effectController routes
- /effects
- /effects/getEffect
- /effects/addEffect
- /effects/updateEffect
- /effects/deleteEffect

### enemyController routes
- enemies
- enemies/getEnemy
- enemies/addEnemy
- enemies/updateEnemy
- enemies/deleteEnemy

### rewardController routes
- /rewards
- /rewards/getReward
- /rewards/addReward
- /rewards/updateReward
- /rewards/deleteReward


### roomController routes
- /rooms
- /rooms/getRoom
- /rooms/addRoom
- /rooms/getUserInRoom
- /rooms/updateRoom
- /rooms/deleteRoom

## Environment Variables
The .env file should contain the following variables:


- PORT=3000
- DATABASE_URL=
- JWT_SECRET=

## Notes
For detailed information about project setup, please refer to any additional documentation or notes provided in the project.

## Contributing
Fork the repository
Create a new branch (git checkout -b feature-branch)
Commit your changes (git commit -m 'Add new feature')
Push to the branch (git push origin feature-branch)
Create a new Pull Request
License
This project is licensed under the MIT License. See the LICENSE file for details.