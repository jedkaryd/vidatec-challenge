# Vidatec challenge
Rest API built in Node.js to manage movies.

## Requirements
For development, you will need Node.js (NVM installation recommended) and MongoDB.

## Install
  $ git clone https://github.com/jedkaryd/vidatec-challenge.git
  $ cd vidatec-challenge
  $ npm install

## Running the project
  $ npm start

## Getting Started
  The API will be available on Port 3000 (`localhost:3000/`), change this configuration if you want to on `server.js` file.
  Hit the following endpoints to handle movies information:

  ### Create movies by uploading a file

  This endpoint receives a .csv file (expected to have this format: `titulo;genero;año;director;actores`), processes it and validates the existences of a document whit the current title before saving it as a new document on the DB.

  POST `localhost:3000/movies`

  ### List all movies

  This endpoint receives three optional parameters: `limit`, `page` and `title`. `page`and `limit`are neccessary to get paginated info, if not provided, the endpoint will return the complete list of movies. If provided, the `title` parameter allows to filter by title.

  GET `localhost:3000/movies`
  GET `localhost:3000/movies?limit=10&page=1`
  GET `localhost:3000/movies?title=a title`

  ### Retrieve a movie

  This endpoint receives an `id` parameter and retrieves the movie that matches with this id, if exists.
  GET `localhost:3000/movies/12345`

  ### Update a movie

  This endpoint receives an `id` parameter and allows to update the movie that matches with this id, if exists. Also it expects to receive a request body with the fields to modify and its values, like this:
  ```
  {
	  "title": "modified title"	
  }
  ```
  PUT `localhost:3000/movies/12345`

  ### Delete a movie

  This endpoint receives an `id` parameter and deletes the movie that matches with this id, if exists.
  DELETE `localhost:3000/movies/12345`
