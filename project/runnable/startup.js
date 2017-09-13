#!/usr/bin/env node
'use strict';
var fs = require("fs") ;
var path = require('path');

/**
 * init app configs
 */
let appConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'appConfig.json'),"utf8"));
global.appConfig = appConfig;
global.appConfig.envMode = appConfig.envMode || "dev";
global.appConfig.contextPath = appConfig.contextPath || "";
global.appConfig.protocol = appConfig.protocol || "http";
global.appConfig.serverPort = appConfig.serverPort || 8080;
global.appConfig.staticResourceVersion = appConfig.staticResourceVersion || "201607210000";
console.log("global.appConfig :\r\n" + JSON.stringify(global.appConfig));

/**
 * init log4js
 */
var log4js = require('log4js');
console.log("log4jsconf path:" + path.join(__dirname, 'log4jsconf.json'));
log4js.configure(path.join(__dirname, 'log4jsconf.json'));//使用绝对路径
log4js.loadAppender('console');
var logger = log4js.getLogger('startup');
logger.info("app start, envMode is : " + global.appConfig.envMode);


/**
 * init app constants
 */
let appConstants = JSON.parse(fs.readFileSync(path.join(__dirname, 'appConstants.json'),"utf8"));
global.appConstants = appConstants;
logger.info("global.appConstants :\r\n" + JSON.stringify(global.appConstants));



/**
 * init redis
 */
//var Redis = require('ioredis');
//logger.info("redisconf path:" + path.join(__dirname, 'redisconf.json'));
//try {
//  var redisConf = fs.readFileSync(path.join(__dirname, 'redisconf.json'),"utf8");
//  logger.info("redis conf :\r\n" + redisConf);
//  var redis = new Redis(JSON.parse(redisConf));
//  global.redis = redis;
//  logger.info("redis init fin" + JSON.stringify(redis));
//}catch (ex){
//  logger.error(ex);
//  throw ex;
//}


/**
 *
 * @type {rootRout|exports|module.exports}
 */

//var zk = require('../dubbo/zk');
//logger.info("zkip is :" + global.appConfig.zkip );
//zk.initConnection(global.appConfig.zkip);


var app = require('../mainapp');
var debug = require('debug')('myapp:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(global.appConfig.serverPort || '8077');
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
logger.info("server start at port :" + port);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

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

  var bind = typeof port === 'string'
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
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
