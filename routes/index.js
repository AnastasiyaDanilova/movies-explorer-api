const router = require('express').Router();
const userRouter = require('./user');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/userControllers');

router.post('/signup', createUser);

router.post('/signin', login);

router.use('/users', auth, userRouter);

router.use('/movies', auth, moviesRouter);

module.exports = router;
