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

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;