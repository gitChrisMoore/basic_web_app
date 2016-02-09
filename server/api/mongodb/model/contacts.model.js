'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactsSchema = new Schema({
  name: { type: String },
  title: { type: String },
  desk_phone: { type: String },
  mobile_phone: { type: String },
  email_address: { type: String },
  company: { type: String },
  date: { type: String },
  },
  { collection: 'contacts' }
);

module.exports = mongoose.model('Contacts', ContactsSchema);