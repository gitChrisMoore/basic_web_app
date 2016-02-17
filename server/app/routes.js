/**
 * routes.js
 * 
 * This file is responsable for declaring all of the routes
 * in which the Express middleware framework is listening for
 */

'use strict';

/**
* Global requirements
*
*/

/**
* NPM requirements
*
*/
var mongoose = require('mongoose');

/**
* Local requirements
*
*/
var parser = require('./middleware/v1/parser');
var checkpathvalid = require('./middleware/v1/checkpathvalid');
var parserip = require('./middleware/v1/parserip');
var ver1 = '/api/v1';
var filename = 'routes.js';
var logger = require('./middleware/v1/loggerService');
var filename = 'routes.js'
var mongoService = require('./middleware/v1/mongoService')
/**
* Export all of the valid routes
*
* GET
*
* POST
*
*/

module.exports = function(app) {

  app.get(ver1 + '/:database/:collection/:action', function (req, res, next) {
    // Check and see if the path has a model that exists
    logger.info(filename, 'START: GET /:database/:collection/:action')
    checkpathvalid(req, res)
        .then(function (isPathValid) {
          // Use the parser function to determine what/if there needs to be a query
          return parser(req, res)
        })
        .then(function (query) {
          // Query the mongo database with the query field
          return mongoService.find(req, res, query)
        })
        .then(function (result) {
          // return to the client a json result file from the query
          logger.info(filename, 'SUCCESS: GET /:database/:collection/:action')
          res.status(200).json(result)
        })
        .catch(next);
  });

  app.get(ver1 + '/:database/:collection/', function (req, res, next) {
    // Check and see if the path has a model that exists
    logger.info(filename, 'START: GET /:database/:collection/')
    checkpathvalid(req, res)
        .then(function (isPathValid) {
          // Use the parser function to determine what/if there needs to be a query
          return parser(req, res)
        })
        .then(function (query) {
          // Query the mongo database with the query field
          return mongoService.find(req, res, query)
        })
        .then(function (result) {
          // return to the client a json result file from the query
          logger.info(filename, 'SUCCESS: GET /:database/:collection/')
          res.status(200).json(result)
        })
        .catch(next);
  });

  app.post(ver1 + '/:database/:collection/', function (req, res, next) {
    // Check and see if the path has a model that exists
    logger.info(filename, 'START: POST /:database/:collection/')
    checkpathvalid(req, res)
        .then(function (isPathValid) {
          // Use the parser function to determine what/if there needs to be a query
          return parser(req, res)
        })
        .then(function (query) {
          // Query the mongo database with the query field
          return mongoService.create(req, res, query)
        })
        .then(function (result) {
          // return to the client a json result file from the query
          logger.info(filename, 'SUCCESS: POST /:database/:collection/')
          res.status(202).json(result)
        })
        .catch(next);
  });

  app.patch(ver1 + '/:database/:collection/:id', function (req, res, next) {
    // Check and see if the path has a model that exists
    logger.info(filename, 'START: PATCH /:database/:collection/')
    checkpathvalid(req, res)
        .then(function (isPathValid) {
          // Use the parser function to determine what/if there needs to be a query
          return parser(req, res)
        })
        .then(function (query) {
          // Query the mongo database with the query field
          return mongoService.update(req, res, query)
        })
        .then(function (result) {
          // return to the client a json result file from the query
          logger.info(filename, 'SUCCESS: PATCH /:database/:collection/')
          res.status(202).json(result)
        })
        .catch(next);
  });

  app.get(ver1 + '/parserip/', function (req, res, next) {
    // Check and see if the path has a model that exists
    parserip(req, res)
        .then(function (result) {
          // Use the parser function to determine what/if there needs to be a query
          res.status(200).json(result)
        })
        .catch(next);
  });

  app.get('*', function route1( req, res, next ) {
      // write response
      res.status(404).sendFile(__dirname + '/views/404.html');
    });


};