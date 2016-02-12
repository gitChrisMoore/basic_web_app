/**
 * Main application file
 */

'use strict';

var express = require('express');
var mongoose = require('mongoose');

// require config, not worrying about what environment is being loaded

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require("./config/env/" + process.env.NODE_ENV);

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/config')(app);
require('./routes')(app);

// try to connect to the mongo database
// if the database cannot be connected
// exit the application

// if the mongo connection fails

console.log('Trying to connect to the following MongoDB Instance: ' + config.mongo.uri)
mongoose.connect(config.mongo.uri)
mongoose.connection.on('error', function(err) {
  console.log("Error while connecting to MongoDB:  " + err);
  process.exit();
});


mongoose.connection.on('connected', function(err) {
  console.log('mongoose is now connected');
  // start app here
  server.listen(config.port, config.ip, function () {
   console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });

});


// Expose app
exports = module.exports = app;