const Movie = require('../models/movies');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  validationErrorText,
  notFoundFilmErrorText,
  forbiddenErrorFilmText,
  badRequestErrorFilmText,
} = require('../utils/constants');

function getFilms(req, res, next) {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => next(err));
}

function createFilm(req, res, next) {
  const { _id } = req.user;

  Movie.create({ owner: _id, ...req.body })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errObject = Object.keys(err.errors).join(', ');

        next(new NotFoundError(validationErrorText(errObject)));
        return;
      }
      next(err);
    });
}

function deleteMovie(req, res, next) {
  const { _id } = req.user;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(notFoundFilmErrorText);
      }
      if (_id === movie.owner.toString()) {
        return movie.remove()
          .then(() => {
            res.send(movie);
          });
      }
      throw new ForbiddenError(forbiddenErrorFilmText);
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(badRequestErrorFilmText));
        return;
      }
      next(err);
    });
}

module.exports = { getFilms, createFilm, deleteMovie };
