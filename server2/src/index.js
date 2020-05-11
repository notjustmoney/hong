const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log('MongoDB connected');
    server = app.listen(config.port, () => {
      console.log(`Listening on port ${config.port}`)
    });
  });

  const exitHandler = () => {
    if(server) {
      server.close(() => {
        console.log('Server closed');
        process.exit(1);
      });
    }
    process.exit(1);
  }

  const unexpectedErrorHandler = error => {
    console.log(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    console.log('SIGTERM recieved');
    if(server) {
      server.close();
    }
  })