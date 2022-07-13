const binance = require('../../api/binance.api');

class TwController {
  
  // handlers
  async getTwHook(req, res) {
    try {
      const { symbol, side, quantity } = req.body ?? null;
      console.log({ symbol, side, quantity });
      let positions = await binance.futuresPositionRisk();
      positions = positions.find((item) => item.symbol === symbol);
      let response = 'not created';
      if (side === 'BUY' && Number(positions.positionAmt) <= 0) response = await binance.futuresMarketBuy(symbol, quantity);
      if (side === 'SELL' && Number(positions.positionAmt) >= 0) response = await binance.futuresMarketSell(symbol, quantity);
      res.json(response).status(200);
    } catch (e) {
      const response = { success: false, data: { error: e.message }, where: 'handleTwHook' };
      console.log(response);
      res.json(response).status(400);
    }
  }
  
  async getBalance(req, res) {
    try {
      let response = await binance.futuresBalance();
      res.json(response.filter((item) => Number(item.balance) ?? 0 > 0)).status(200);
    } catch (e) {
      const response = { success: false, data: { error: e.message }, where: 'handleTwHook' };
      console.log(response);
      res.json(response).status(400);
    }
  }
  
  async getPositions(req, res) {
    try {
      let response = await binance.futuresPositionRisk();
      res.json(response.filter((item) => Number(item.positionAmt) ?? 0 > 0)).status(200);
    } catch (e) {
      const response = { success: false, data: { error: e.message }, where: 'handleTwHook' };
      console.log(response);
      res.json(response).status(400);
    }
  }
}

module.exports = new TwController();
