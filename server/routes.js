'use strict';

var errors = require('./assets/errors');
var mongoose = require('mongoose');


module.exports = function(app) {


var fs = require('fs');

  app.get('/:folder',function(req,res,next) {
      var path = __dirname + '/' + req.params.folder + '/index.jade';



      if(fs.existsSync(path))
      {
          console.log(req.params.folder)
          res.render(path);
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

  app.get('/:api/:ocean/:lake/:pond',function(req,res,next) {
      var path = __dirname + '/' + req.params.api +
                             '/' + req.params.ocean + 
                             '/' + req.params.lake +
                             '/' + req.params.pond + 
                              '.model.js';

      //console.log('step 2')
      //console.log(path)
      //console.log(req.query.collection)

      if(fs.existsSync(path))
      {
            var collection = require(path)

            console.log(req.query._id)

            var query = buildQuery(req.query)

            console.log(query)

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