var Q = require('q');


/*
  This module takes the path and determines if a mongo model
  is present for the look up to take

  If there is a string present, it should return 
*/

module.exports = function (req, res) {
	var deferred = Q.defer();

	console.log('starting the function parser.js')


  // Build the temporary path

  console.log(req.params)

  var query = {}

	if (req.params.hasOwnProperty("action")){
		if (req.params.action == 'find'){
			query = JSON.parse(req.query.string)
			console.log('mdae it this far')
			deferred.resolve(query)
		}
		console.log('mdae it this far')
	deferred.resolve(query)
	}
	deferred.resolve(query)
	return deferred.promise;
};