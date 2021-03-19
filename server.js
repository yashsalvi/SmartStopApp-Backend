const http = require('http');
const app = require('./app');
const port = ****;

const server = http.createServer(app);

server.listen(port);
