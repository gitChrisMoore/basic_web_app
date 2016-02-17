/**
 * mongoService.js
 * 
 */

'use strict';

/**
* Global Requirements
*
*/
var fs = require('fs');
var path = require("path")

/**
* NPM Requirements
* 
*/
var path = require("path");
var Q = require('q');
var mongoose = require('mongoose');
var _ = require('lodash');

/**
* Local Requirements
*
*/ 
var ver1 = '/api/v1';
var filename = 'mongoService.js';





var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "myapp"});

var controller = {

	find: function (req, res, query) {
		log.info(filename, 'START: find')

		var deferred = Q.defer();

		var tempPath = ver1 + '/' +  req.params.database + '/' +  req.params.collection + '.model.js';
		var newPath = path.join(__dirname, '../../', tempPath)

		var collection = require(newPath)

		collection.find(query)
		.exec(function (err, result) {
			if (err) {
				log.info(filename, err)
				deferred.reject()
			}
			log.info(filename, 'SUCCESS: FIND')
			deferred.resolve(result)
		});
		return deferred.promise;
	},

	create: function (req, res) {
		log.info(filename, 'START: find')

		var deferred = Q.defer();

		var tempPath = ver1 + '/' +  req.params.database + '/' +  req.params.collection + '.model.js';
		var newPath = path.join(__dirname, '../../', tempPath)

		var collection = require(newPath)

		collection.create(req.body, function (err, result) {
			if (err){
				log.info(filename, err)
				deferred.reject()
			}
			log.info(filename, 'SUCCESS: FIND')
			deferred.resolve(result)
		})

		return deferred.promise;
	},

	update: function (req, res) {
		log.info(filename, 'START: UPDATE')

		var deferred = Q.defer();

		var tempPath = ver1 + '/' +  req.params.database + '/' +  req.params.collection + '.model.js';
		var newPath = path.join(__dirname, '../../', tempPath)

		var collection = require(newPath)

		if (req.body._id) {
			delete req.body._id;
		}

		//console.log(collection)

		var itemId = req.params.id;

		collection.findById(itemId, function (err, resultSingleItem) {
			if (err) {
				return log.info(err);
			}
			if (!resultSingleItem) {
				return deferred.reject()
			}

			var itemAttributes = req.body

			var updatedItem = _.merge(resultSingleItem, itemAttributes)

			updatedItem.save (function (err) {
				if (err) {
					log.info(err)
					return deferred.reject()
				}
				log.info(filename, 'SUCCESS: UPDATE')
				deferred.resolve(resultSingleItem)
			})
		})

		return deferred.promise;
	},


}

module.exports = exports = controller