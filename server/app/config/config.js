/*jslint node: true */
"use strict";

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');

//module.exports = config;

module.exports = function(app) {
  var env = app.get('env');
  var root = path.normalize(__dirname + '/../../..');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  if ('production' === env) {
    //app.use(favicon(path.join(root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(root, 'public')));
    app.set('appPath', root + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
  	console.log('development');
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(root, '.tmp')));
    app.use(express.static(path.join(root, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};