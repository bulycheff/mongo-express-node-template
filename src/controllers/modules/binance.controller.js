const api = require('../../api/binance.api');

class BinanceController {
  async getInfo(req, res) {
    try {
      const client = api();
      const data = await client.futuresExchangeInfo();
      res.status(200).json(await data);
    } catch (e) {
      const response = { success: false, data: { error: e.message } };
      res.status(400).json(response);
    }
  }
  
}

module.exports = new BinanceController();
