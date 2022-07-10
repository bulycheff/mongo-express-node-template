require('dotenv').config();

const { default: Binance } = require('binance-api-node');

const client = () => Binance({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  getTime: () => Date.now(),
});

module.exports = client;
