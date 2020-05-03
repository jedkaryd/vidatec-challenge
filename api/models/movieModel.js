
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  title: {
    type: String,
    required: 'Enter the title of the movie',
    unique: true
  },
  genre: {
    type: String,
  },
  year: {
    type: String,
  },
  director: {
    type: String,
  },
  actors: { 
    type: [{
      type: String
    }]
  }
});

module.exports = mongoose.model('Movies', MovieSchema);
