/*jslint node: true */
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CircuitsSchema = new Schema({
  CID: { type: String },
  classification: { type: String },
  description: { type: String },
  type: { type: String },
  access_bw: { type: String },
  port_bw: { type: String },
  vendor: { type: String },
  sitecode: { type: String },
  ip_address: { type: String },
  comments: { type: String },
  contract_num: { type: String },
  contract_term: { type: String },
  contract_expiration: { type: Number},
  contract_details: { type: String},
  country: { type: String},
  port_cost: { type: String},
  access_cost: {type: String},
  currency: { type: String },
  total_cost: { type: Number },
  autorenew: { type: Boolean },
  },
  { collection: 'circuits' }
);

module.exports = exports = mongoose.model('Circuits', CircuitsSchema);