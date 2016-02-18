'use strict'

var Q = require('q');
var querystring = require('querystring');
var http = require('http');
var fileName = 'singleCommands.js'
var logger = require('../../../middleware/v1/loggerService')
var request = require('request');


var controller = {

	postCommand: function (req, res) {
		var functionName = 'postCommand' 
		logger.info(fileName, 'START ' +functionName)
		var deferred = Q.defer();

		var requestURL = 'http://172.30.53.201:5000/' + req.params.vendor + '/' + req.params.command + '/'
		var postObjectJson = {"switch": "10.226.130.3"}
		
		request({
			url: requestURL,
			method: "POST",
			json: true,
			body: postObjectJson
		}, function (error, result, body) {
			deferred.resolve(body)
		})


		logger.info(fileName, 'FINISH ' +functionName)
		return deferred.promise;
	}

};

module.exports = exports = controller