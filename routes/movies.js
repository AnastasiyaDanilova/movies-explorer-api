const router = require('express').Router();
const { getFilms, createFilm, deleteMovie } = require('../controllers/movieControllers');

router.get('/', getFilms);

router.post('/', createFilm);

router.delete('/:movieId', deleteMovie);

module.exports = router;
