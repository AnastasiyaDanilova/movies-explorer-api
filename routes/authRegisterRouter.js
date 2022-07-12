const router = require('express').Router();
const { createUser, login } = require('../controllers/userControllers');
const { registrValidator, authValidator } = require('../middlewares/validator');

router.post('/signup', registrValidator, createUser);

router.post('/signin', authValidator, login);

module.exports = router;
