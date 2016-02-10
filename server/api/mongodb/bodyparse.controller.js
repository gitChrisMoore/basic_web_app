'use strict';

var bodyParser = require("body-parser");
//var contacts = require('./model/contacts.model');
var mongoose = require('mongoose');

// Get list of tool
exports.post = function (req, res) {

    index

};

function index() {
  contacts.find()
    .exec(function (err, device) {
      if (err) {
        return handleError(res, err);
      }
      //console.log(device)
      return res.json(200, device);
    });
};

function handleError(res, err) {
  return res.send(500, err);
}