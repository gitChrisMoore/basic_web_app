'use strict';

var errors = require('./assets/errors');
var mongoose = require('mongoose');
var async = require('async')
module.exports = function(app) {


var ver1 = '/api/v1'
var fs = require('fs');

// Request Parse Function
// This will take in the full req variable from the html
// If there is no req veriable, it will return a completely blank
// query

  function requestParse(req) {

    var query = {}

    if (req.params.hasOwnProperty("id")){
      console.log('This is the id which was searched for ' + req.params.id)
      query["_id"] =  req.params.id
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

          console.log(path)

          collection.find(query)
               .exec(function (err, result) {
                 if (err) {
                   return handleError(res, err);
                 }
                 console.log('result')
                 return res.json(200,result)
               });
      } 
    next();
}



  app.get(ver1 + '/:database/:collection/', getMiddleware1,  function route1( req, res, next ) {
      // write response

});


  app.get(ver1 + '/:database/:collection/:id',function(req,res,next) {
      var path = __dirname + ver1
                           + '/' +  req.params.database
                           + '/' +  req.params.collection
                           + '.model.js';

      if(fs.existsSync(path))
      {
          var collection = require(path)
          var query = requestParse(req)

          console.log(path)

          collection.find(query)
               .exec(function (err, result) {
                 if (err) {
                   return handleError(res, err);
                 }
                 //console.log(device)
                 return res.json(200, result);
               });
      }
      else
      {
          next();
      }
  });




  function buildQuery(queryString) {
    
    var query = {}

    for (var propName in queryString) {
        if (queryString.hasOwnProperty(propName)) {
            console.log(propName, queryString[propName])
            query[propName] = queryString[propName];
        }
    }
  return query
  }

  app.get('/api/:ocean/:lake/:pond',function(req,res,next) {
      var path = __dirname + ver1
                           + '/' +  req.params.lake
                           + '/' +  req.params.pond
                           + '.model.js';

                           console.log(path)


      var path = __dirname + '/api/' + req.params.ocean + 
                             '/' + req.params.lake +
                             '/' + req.params.pond + 
                              '.model.js';

      //console.log('step 2')
      console.log(path)
      //console.log(req.query.collection)

      if(fs.existsSync(path))
      {
            var collection = require(path)

            console.log(req.query.string)

            var query = buildQuery(req.query)

            console.log(query)

            //var query = req.query.string

            collection.find(query)
                .exec(function (err, device) {
                  if (err) {
                    return handleError(res, err);
                  }
                  //console.log(device)
                  return res.json(200, device);
                });
      }
      else
      {
          next();
      }
  });

  app.get('/:folder/:topic/:item',function(req,res,next) {
      var path = __dirname + '/' + req.params.folder + '/' + req.params.topic + '/' + req.params.item;

      console.log(path)
      console.log('step three')

      if(fs.existsSync(path))
      {
          res.render(path);
      }
      else
      {
          next();
      }
  });


  app.use(function(req, res){
      res.status(404).render(app.get('appPath') + '/views/404.html');
  });

};