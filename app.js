require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3001, MONGO_DATABASE = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

mongoose.connect(MONGO_DATABASE);

app.use(requestLogger);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Server Error' : message });
  next();
});

app.listen(PORT);
