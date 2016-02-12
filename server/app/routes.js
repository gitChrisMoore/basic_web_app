'use strict';

//var errors = require('./assets/errors');
var mongoose = require('mongoose');
var parser = require('./middleware/parser')
var checkpathvalid = require('./middleware/checkpathvalid')
var mongofind = require('./middleware/mongofind')

var ver1 = '/api/v1';

module.exports = function(app) {




  app.get(ver1 + '/:database/:collection/:action', function (req, res, next) {
    // Check and see if the path has a model that exists
    checkpathvalid(req, res)
        .then(function (isPathValid) {
          // Use the parser function to determine what/if there needs to be a query
          return parser(req, res)
        })
        .then(function (query) {
          // Query the mongo database with the query field
          return mongofind(req, res, query)
        })
        .then(function (result) {
          // return to the client a json result file from the query
          res.status(200).json(result)
        })
        .catch(next);
  });

  app.get(ver1 + '/:database/:collection/', function (req, res, next) {
    // Check and see if the path has a model that exists
    checkpathvalid(req, res)
        .then(function (isPathValid) {
          // Use the parser function to determine what/if there needs to be a query
          return parser(req, res)
        })
        .then(function (query) {
          // Query the mongo database with the query field
          return mongofind(req, res, query)
        })
        .then(function (result) {
          // return to the client a json result file from the query
          res.status(200).json(result)
        })
        .catch(next);
  });

  app.get('*', function route1( req, res, next ) {
      // write response
      res.status(404).sendFile(__dirname + '/views/404.html');
});


};