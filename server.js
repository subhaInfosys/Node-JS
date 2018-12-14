const http = require('http');
const app  = require('./app');
const config = require('./config/Constant');

const port = config.APP_PORT;

const server = http.createServer(app);

server.listen(port);