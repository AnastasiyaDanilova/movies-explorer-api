const Movie = require('../models/movies');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

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

        next(new NotFoundError(`Некорректные данные: ${errObject}`));
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
        throw new NotFoundError('Такой фильм не найден');
      }
      if (_id === movie.owner.toString()) {
        return movie.remove()
          .then(() => {
            res.send(movie);
          });
      }
      throw new ForbiddenError('Нет доступа к удалению фильма');
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id фильма'));
        return;
      }
      next(err);
    });
}

module.exports = { getFilms, createFilm, deleteMovie };
