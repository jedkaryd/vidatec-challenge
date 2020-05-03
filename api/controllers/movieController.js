'use strict';

const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');

const Movie = mongoose.model('Movies');

exports.list_all_movies = (req, res) => {
  Movie.find({}, (err, movies) => {
    if (err) res.send(err);
    res.json(movies);
  });
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
    .on('error', (err) => res.end(err));
};

const mapMovies = (data) => {
  const title = data.titulo;

  Movie.find({ title: title })
  .then((movie) => {
    if (movie.length > 0) {
      console.log(`Duplicated movie: ${movie}, data title: ${title}`)
      return;
    }

    const newMovie = new Movie({
      title: data.titulo,
      genre: data.genero,
      year: data.año,
      director: data.director,
      actors: data.actores
    });

    newMovie.save(function(err, doc) {
      if (err) return console.error(err);
      console.log(`Document succussfully inserted! ${doc.title}`);
    });
  }).catch((err) => {
    console.log(`Error mapping movies ${err}`);
  })
}
