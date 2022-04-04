
require('dotenv/config');
require('express-async-errors');

const express = require('express');

const connectCosmoDb = require('./database');
const routes = require('./routes');
connectCosmoDb();

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

}
module.exports = new App().server;