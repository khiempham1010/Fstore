//defind dependences
const http = require('http');
const app = require('./app.js');

//defind port
const port=process.env.PORT||8080;

//create server
const server=http.createServer(app);

//listen port
server.listen(port);