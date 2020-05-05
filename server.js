const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const routes = require('./api/routes/movieRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost/Moviesdb', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) return console.error(err);
  console.log("Succesfully connected to DB.")
}); 

require('./api/models/movieModel');

app.set('port', PORT);
app.set('env', NODE_ENV);
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(cors());

routes(app);

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(
    `Express Server started on Port ${app.get(
      'port'
    )} | Environment : ${app.get('env')}`
  );
});
