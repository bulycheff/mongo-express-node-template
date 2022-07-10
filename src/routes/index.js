const twRouter = require('./modules/tw.routes');
const binanceRouter = require('./modules/binance.routes');

module.exports = [
  { routes: twRouter, path: '/hook' },
  { routes: binanceRouter, path: '/binance' },
];
