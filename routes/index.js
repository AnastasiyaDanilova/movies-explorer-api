const router = require('express').Router();
const userRouter = require('./user');
const moviesRouter = require('./movies');
const authRegisterRouter = require('./authRegisterRouter');
const auth = require('../middlewares/auth');

router.use('/users', auth, userRouter);

router.use('/movies', auth, moviesRouter);

router.use(authRegisterRouter);

module.exports = router;
