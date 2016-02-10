'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationsSchema = new Schema({
  name: { type: String },
  cmn_name: { type: String },
  site_code: { type: String },
  legal_address: { type: String },
  ship_address: { type: String },
  tech_contact: { type: String },
  sec_tech_contact: { type: String },
  admin_contact: { type: String },
  region: { type: String },
  sub_region: { type: String },
  country: { type: String },
  },
  { collection: 'locations' }
);

module.exports = mongoose.model('Locations', LocationsSchema);