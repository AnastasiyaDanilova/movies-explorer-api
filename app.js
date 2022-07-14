require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const rateLimit = require('./middlewares/rateLimit');
const crashTest = require('./middlewares/crashTest');

const app = express();

const { PORT = 3001, MONGO_DATABASE = 'mongodb://localhost:27017/moviesdb' } = process.env;

mongoose.connect(MONGO_DATABASE);

app.use(requestLogger);

app.use(rateLimit);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(helmet());

app.get('/crash-test', crashTest);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
