const express = require('express');
const BlockChainController = require('../controllers/BlockChainController');

const routes = express.Router();


routes.post('/block', BlockChainController.insert);
routes.post('/block/chain', BlockChainController.find);

module.exports = routes;