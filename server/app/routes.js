'use strict';

//var errors = require('./assets/errors');
var mongoose = require('mongoose');
module.exports = function(app) {


var ver1 = '/api/v1'
var fs = require('fs');

// Request Parse Function
// This will take in the full req variable from the html
// If there is no req veriable, it will return a completely blank
// query

  function requestParse(req) {

    var query = {}
    
    if (req.params.hasOwnProperty("action")){
      
      if (req.params.action == 'find'){
          console.log('setting the query')
          query = JSON.parse(req.query.string)
          return query
      }
      console.log('found more than one')
      //query["_id"] =  req.params.id
    }
    return query
  }


// Single Item Return

function getMiddleware1( req, res, next ) {
    // ...
    
      var path = __dirname + ver1
                           + '/' +  req.params.database
                           + '/' +  req.params.collection
                           + '.model.js';
      if(fs.existsSync(path))
      {
          var collection = require(path)
          var query = requestParse(req)

          collection.find(query)
               .exec(function (err, result) {
                 if (err) {
                   return handleError(res, err);
                 }
                 //console.log(res)
                 return res.status(200).json(result)
               });
      } 
    next();
}



  app.get(ver1 + '/:database/:collection/:action', getMiddleware1,  function route1( req, res, next ) {
      // write response
      
      
});

  app.get(ver1 + '/:database/:collection/', getMiddleware1,  function route1( req, res, next ) {
      // write response
      
});

// Catch all for any website that does not exist

  app.get('*', function route1( req, res, next ) {
      // write response
      res.status(404).sendFile(__dirname + '/views/404.html');
});


};