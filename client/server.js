// GLOBAL VARIABLES
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { createServer } = require('http');

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3000);

const app = express();
const dev = app.get('env') !== 'production';

// Serve up static assets (usually on heroku)
if (!dev) {
  app.use(morgan('common'));
  app.use(express.static(path.resulve(__dirname, 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

if (dev) {
  // logging for request to the console
  app.use(morgan('dev'));
}
const server = createServer(app);

server.listen(PORT, err => {
  if (err) throw err;
  console.log('server client started');
});

