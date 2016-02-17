/**
 * Primary application file to start the server
 * 
 */

'use strict';

/**
* Global Requirements
*
* Setup and define server configuration
*/
var express = require('express');
var app = express();
var server = require('http').createServer(app);

/**
* NPM Requirements
* 
*/
var mongoose = require('mongoose');

/**
* Local Requirements
*
* Setup and define server configuration
* Expect a variable to be passed, if not use development
*/ 
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require("./config/env/" + process.env.NODE_ENV);
require('./config/config')(app);
require('./routes')(app);

/**
* Server Initialization
*
* This will try to connect to the mongo database from the
* configuration file, if the mongo database cannot be connected
* it will throw a error and stop
*/ 

mongoose.connect(config.mongo.uri)
mongoose.connection.on('error', function(err) {
  console.log("Error while connecting to MongoDB:  " + err);
  process.exit();
});

// check to see if the server is connected
mongoose.connection.on('connected', function(err) {
  // server can successfully connect to the mongo database
  server.listen(config.port, config.ip, function () {
   console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });

});


// Expose app
exports = module.exports = app;