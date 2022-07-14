const router = require('express').Router();
const { getFilms, createFilm, deleteMovie } = require('../controllers/movieControllers');
const { moviePostValidator, movieDeleteValidator } = require('../middlewares/validator');

router.get('/', getFilms);

router.post('/', moviePostValidator, createFilm);

router.delete('/:movieId', movieDeleteValidator, deleteMovie);

module.exports = router;
