var Q = require('q');
var ver1 = '/api/v1';
var fs = require('fs');
var path = require("path")

/*
  This module takes the path and determines if a mongo model
  is present for the look up to take

  If present it will return a resolved promise

  If it is not present it will return a rejected promise
*/

module.exports = function (req, res) {
	var deferred = Q.defer();

	console.log('starting the function checkpathvalid')


  // Build the temporary path

	var tempPath = ver1 + '/' +  req.params.database + '/' +  req.params.collection + '.model.js';
  var newPath = path.join(__dirname, '../', tempPath)


	console.log('The temporary path is: ' + newPath)

  ispathvalid = 'true'

  // return a pomise based on whether or not the path is valid
  
  if(fs.existsSync(newPath))
  {
    console.log('promise - resolved')
    deferred.resolve(ispathvalid)
  }
  else
  {
    console.log('promise - deferred')
    deferred.reject()
  }

	return deferred.promise;
};