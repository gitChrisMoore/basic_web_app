'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DeviceSchema = new Schema({
node: { type: String },
Hostname: { type: String }
},
{ collection: 'nodes' }
);
module.exports = mongoose.model('Device', DeviceSchema);