'use strict';

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
            80,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            'mongodb://172.21.67.30:27017/amwayio'
  },
  seedDB: false
};
