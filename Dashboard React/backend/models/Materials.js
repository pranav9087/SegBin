const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const materialSchema = new Schema({}, { strict: false });


module.exports = mongoose.model('Material', materialSchema, 'test');