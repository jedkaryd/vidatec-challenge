'use strict';

const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');

const Movie = mongoose.model('Movies');

exports.list_all_movies = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const match = req.query.title != undefined ? { title: req.query.title } : {}

  Movie.paginate(match, { page: page, limit: limit })
    .then(response => res.send(response))
    .catch(err => res.send(err));
};

exports.upload_csv = (req, res) => {
  fs.createReadStream(req.file.path)
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => {
      mapMovies(data);
    })
    .on('end', () => {
      fs.unlinkSync(req.file.path);
      res.send('File uploaded');
    })
    .on('error', err => res.end(err));
};

const mapMovies = (data) => {
  const title = data.titulo;

  Movie.findOne({ title: title })
    .then((movie) => {
      if (movie != null) {
        const error = new Error(`Duplicated movie: ${movie}, data title: ${title}`)
        return Promise.reject(error);
      }

      const newMovie = new Movie({
        title: data.titulo,
        genre: data.genero,
        year: data.año,
        director: data.director,
        actors: data.actores
      });

      newMovie.save()
        .then(() => {
          console.log(`Document succussfully inserted! ${doc.title}`);
        })
        .catch(err => console.log('Error while saving document'));
    })
    .catch(err => console.log(`Error mapping movies ${err}`));
}
