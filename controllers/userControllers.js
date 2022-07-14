const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

const {
  validationErrorText,
  conflictErrorEmailText,
  notFoundUserErrorText,
  badRequestUserErrorText,
  badRequestUserIdErrorText,
  unauthorizedErrorText,
} = require('../utils/constants');

function getUserInfo(req, res, next) {
  User.findById(req.user._id)
    .then((userData) => {
      res.send(userData);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(badRequestUserErrorText));
        return;
      }
      next(err);
    });
}

function createUser(req, res, next) {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((user) => {
          res.send({
            email,
            name,
            _id: user._id,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            const errObject = Object.keys(err.errors).join(', ');
            next(new BadRequestError(validationErrorText(errObject)));
            return;
          }
          if (err.code === 11000) {
            next(new ConflictError(conflictErrorEmailText));
            return;
          }
          next(err);
        });
    }).catch(next);
}

function updateProfile(req, res, next) {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError(notFoundUserErrorText);
      }
      res.send(userData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errObject = Object.keys(err.errors).join(', ');
        next(new BadRequestError(validationErrorText(errObject)));
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequestError(badRequestUserIdErrorText));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError(conflictErrorEmailText));
        return;
      }
      next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token })
        .end();
    })
    .catch((err) => {
      if (err.name === 'Error') {
        next(new UnauthorizedError(unauthorizedErrorText));
        return;
      }
      next(err);
    });
}

module.exports = {
  getUserInfo,
  createUser,
  login,
  updateProfile,
};
