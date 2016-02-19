/*jslint node: true */
"use strict";

var path = require('path');
var _ = require('lodash');

// development specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.IP ||
            undefined,

  // Server port
  port:     process.env.PORT ||
            3000,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            'mongodb://172.30.53.201:27017/amwayio'
  },
  seedDB: false
};
