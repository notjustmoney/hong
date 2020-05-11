const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const { jwtStrategy } = require('./config/passport');
const routes = require('./routes');
const AppError = require('./utils/AppError');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();

app.use(helmet());

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(xss());

// gzip compression
app.use(compression());

// CORS configuration
app.use(cors());
app.options('*', cors());

// Passport.js JWT authentication configuration
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// API routes
app.use('/', routes);

// Convert error to AppError
app.use((req, res, next) => {
  next(new AppError(httpStatus.NOT_FOUND, 'Not found'));
});

// Error Handling
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
