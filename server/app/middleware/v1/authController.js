/*jslint node: true */
"use strict";

/**
* Global Requirements
*
*/
var session = require('express-session');
var ActiveDirectory = require('activedirectory');

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
var logger = require('./loggerService');

var ad = new ActiveDirectory(config);
var filename = 'authController.js';

var controller = {

	index: function (req, res) {
		logger.info(filename, 'START: index');
		var deferred = Q.defer();

		//THIS DOESN"T
		//logger.info(filename, 'SESSION USER: ' + req.session.user);
		deferred.resolve();

		logger.info(filename, 'SUCCESS: index');
		return deferred.promise;
	},

	showSessionID: function (req, res) {
		logger.info(filename, 'START: showSessionID');
		var deferred = Q.defer();

		logger.info(filename, 'SESSION showSessionID: ' + req.session.user);
		deferred.resolve(result);

		logger.info(filename, 'SUCCESS: showSessionID');
		return deferred.promise;
	},

	auth: function (req, res) {
		logger.info(filename, 'START: auth');
		var deferred = Q.defer();

		var username =  req.body.username + "@na.intranet.msd";
		var password = req.body.password;
		ad.authenticate(username, password, function(err, auth) {
			if (err) {
				logger.info(filename, 'ERROR: auth '+ JSON.stringify(err));
				deferred.reject();
			}

			if (auth) {
				logger.info(filename, 'SUCCESS: authenticated');
				//req.session.user = username;
				//req.session.auth = auth;
				deferred.resolve();
			} else {
				logger.info(filename, 'ERROR: autehtication failed '+ username + '  ' + auth);
				res.redirect('/login');
			};

		deferred.resolve()

		logger.info(filename, 'SUCCESS: auth');
		
	})
		return deferred.promise;

	},

	getgroups : function (req, res) {
		logger.info(filename, 'START: getgroups');
		var deferred = Q.defer();

		ad.getGroupMembershipForUser('aiupg53', function(err, groups) {
			logger.info(filename, 'getgroups: req.params.username: ' + req.params.username);
			if (err) {
				logger.info(filename, 'ERROR: getgroups '+ JSON.stringify(err));
				return deferred.reject()
			}

			if (! groups) logger.info(filename, 'ERROR: username not found: '+ username);
			else {
				logger.info(filename, 'STATUS: groups: '+ JSON.stringify(groups))
				return deferred.resolve("Groups: <BR>" + JSON.stringify(groups));
			}

		logger.info(filename, 'SUCCESS: getgroups');
		return deferred.promise;
	})
}


};

module.exports = exports = controller;