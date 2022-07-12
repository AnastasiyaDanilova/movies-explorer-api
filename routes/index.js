const router = require('express').Router();
const userRouter = require('./user');
const moviesRouter = require('./movies');
const authRegisterRouter = require('./authRegisterRouter');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { notFoundErrorText } = require('../utils/constants');

router.use('/users', auth, userRouter);

router.use('/movies', auth, moviesRouter);

router.use(authRegisterRouter);

router.use(auth, (req, res, next) => {
  next(new NotFoundError(notFoundErrorText));
});

module.exports = router;
