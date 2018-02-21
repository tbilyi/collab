#!/usr/env node

/**
 * Module dependencies.
 */
"use strict";
let app = require('./app.js'),
    debug = require('debug')('nodetest2:server'),
    http = require('http');

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '3008');
app.set('env', (process.env.NODE_ENV|| 'local'));
global.ENV = 'local';
app.set('port', port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function() {
  console.log('Server started: http://localhost:' + port + '/');
  console.log('Server started: Environment - ' + app.get('env'));
});
server.on('error', () => {
  console.log('server error');
});
server.on('listening', onListening);
server.on('exit', () => {
  console.log('server exit');
});
server.on('close', () => {
  console.log('server close');
});
process.on('SIGINT', () =>  {
  server.close();
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
