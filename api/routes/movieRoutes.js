'use strict';

const path = require('path');
const root = path.dirname(require.main.filename);
const multer = require('multer');
const upload = multer({ dest: root + '/tmp/csv/' });

module.exports = function(app) {
  const movie = require('../controllers/movieController');

  app.route('/movies')
    .get(movie.list_all_movies)
    .post(upload.single('file'), movie.upload_csv)

  app.route('/movies/:id')
    .get(movie.find_one)
    .put(movie.update)
    .delete(movie.delete)
};
