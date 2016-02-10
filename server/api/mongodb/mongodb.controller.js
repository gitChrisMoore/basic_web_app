/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /tool              ->  index
 * POST    /tool              ->  create
 * GET     /tool/:id          ->  show
 * PUT     /tool/:id          ->  update
 * DELETE  /tool/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');


// List of data models
//var contacts = require('./model/contacts.model');
var locations = require('./model/contacts.model');


// Logic to dynamically derive the querry paramater for the collection

var queryStringCollection = function(queryParamaters) {
  if ('contacts' === queryParamaters) {
    var collection = require('./model/contacts.model')
    return collection
  }
  if ('locations' === queryParamaters) {
    var collection = require('./model/locations.model')
    return collection
  }
};


// Get list of tool
exports.index = function (req, res) {

  var collection = queryStringCollection(req.query.collection)

  collection.find()
    .exec(function (err, device) {
      if (err) {
        return handleError(res, err);
      }
      //console.log(device)
      return res.json(200, device);
    });
};

exports.indexShort = function (req, res) {
  mongodb.find({},{ Vendor: true, node: true, Hostname: true, modifiedtime: true })
    .exec(function (err, device) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, device);
    });
};


// Get a single tool
exports.show = function (req, res) {
  mongodb.findById(req.params.id)
    .exec(function (err, device) {
      if (err) {
        return handleError(res, err);
      }
      if (!device) {
        return res.send(404);
      }
      console.log('returned this device')
      console.log(device)
      return res.json(device);
    });
};

// Creates a new tool in the DB.
exports.create = function (req, res) {
  console.log(req.body)
  mongodb.create(req.body, function (err, tool) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, tool);
  });
};

exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  if (req.body.poolMembersGLSB) {
    if (req.body.poolMembersGLSB._id)
      console.log('deleteing')
      delete req.body.poolMembersGLSB._id
  }
  mongodb.findById(req.params.id, function (err, device) {
    if (err) {
      return handleError(res, err);
    }
    if (!device) {
      return res.send(404);
    }


   var deviceAttributes = req.body

   var updated = _.merge(device, deviceAttributes);

    updated.markModified('poolMembersGLSB');
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, device);
    });
  });
};

// Deletes a tool from the DB.
exports.destroy = function (req, res) {
  mongodb.findById(req.params.id, function (err, device) {
    if (err) {
      return handleError(res, err);
    }
    if (!device) {
      return res.send(404);
    }
    device.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

exports.distinct = function (req, res) {
  var distinctValues = {};

  var getUniqueCategories = function (callback) {
    mongodb.distinct('category', function (error, categories) {
      distinctValues.categories = categories;
      callback(null, categories);
    });
  };

  async.parallel([
    getUniqueCategories
  ], function (err, results) {
    res.send(distinctValues);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}