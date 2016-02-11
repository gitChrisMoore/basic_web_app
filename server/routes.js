'use strict';

var errors = require('./assets/errors');
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

      console.log('This is the id which was searched for ' + req.params.action)

      if (req.params.action == 'findone'){

        if (req.query.hasOwnProperty("id")){
          console.log('the query has the following id: ' + req.query.id)
          var documentId = String(req.query.id)
          query["_id"] =  documentId


        var name = "_id";
        var value = req.query.id;
        var query = {};
        query[name] = value;

          return query

        }





          return console.log('found find')
      }
      console.log('found more than one')
      //query["_id"] =  req.params.id
    }

    return query
  }


// Single Item Return

function getMiddleware1( req, res, next ) {
    // ...
    console.log('middleware1')
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
                 return res.json(200,result)
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


  app.use(function(req, res){
      res.status(404).render(app.get('appPath') + '/views/404.html');
  });

};