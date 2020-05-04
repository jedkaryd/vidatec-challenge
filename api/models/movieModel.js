
'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
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

MovieSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Movies', MovieSchema);
