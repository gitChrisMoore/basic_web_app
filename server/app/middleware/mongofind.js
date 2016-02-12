var ver1 = '/api/v1';
var Q = require('q');
var mongoose = require('mongoose');
var path = require("path")
var parser = require('./parser')
/*
  This module takes the path and determines if a mongo model
  is present for the look up to take

  If there is a string present, it should return 
*/

module.exports = function (req, res, query) {
	var deferred = Q.defer();

	console.log('starting the function mongofind')


  // Build the temporary path
  var tempPath = ver1 + '/' +  req.params.database + '/' +  req.params.collection + '.model.js';
  var newPath = path.join(__dirname, '../', tempPath)

  // Require the model be present
  var collection = require(newPath)

    
  console.log(query)

  collection.find(query)
  	.exec(function (err, result) {
  		if (err) {
  			console.log('mongofind came across the following error' + err)
  			deferred.reject()
  		}
  		console.log('mongofind has resolved the result')
  		console.log(result)
  		deferred.resolve(result)
  	});

  	return deferred.promise;
};