const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes');
const AppError = require('./utils/AppError');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(helmet());

app.use('/public', express.static('public'));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(xss());

// gzip compression
app.use(compression());

// CORS configuration
const corsOptions = {
  origin: '*',
  method: 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTION',
  preflightContinue: false,
};
app.use(cors(corsOptions));
app.options('*', cors());

// Passport.js JWT authentication configuration
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

if (config.env === 'production') {
  app.use('/auth', authLimiter);
}

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
