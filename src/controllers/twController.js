require('../../localStorage.js');

class TradingViewController {
  //methods
  static async push(data) {
    const dataObj = {
      ...data,
      date: new Date(Date.now()),
    };
    console.log({ dataObj });
    let currentData = JSON.parse(localStorage.getItem('tradingView'));
    console.log({ currentData });
    if (!currentData) currentData = [];
    currentData.push(dataObj);
    await localStorage.setItem('tradingView', JSON.stringify(currentData));
    console.log({ updatedLS: localStorage.getItem('tradingView') });
  }
  
  
  //getters
  static get data() {
    const data = JSON.parse(localStorage.getItem('tradingView'));
    return data ?? [];
  }
  
  // handlers
  async handleTwHook(req, res) {
    try {
      const { push } = TradingViewController;
      const { data } = req.body ?? null;
      const { pair } = req.params ?? null;
      const dataItem = {
        pair: pair.toLowerCase() ?? null,
        data: data,
      };
      await push(dataItem);
      const response = { success: true, data };
      res.json(response).status(200);
    } catch (e) {
      const response = { success: false, data: { error: e.message }, where: 'handleTwHook' };
      console.log(response);
      res.json(response).status(400);
    }
  }
  
  async getStorageData(req, res) {
    try {
      const response = { success: true, data: TradingViewController.data };
      res.json(response).status(200);
    } catch (e) {
      const response = { success: false, data: { error: e.message } };
      console.log(response);
      res.json(response).status(400);
    }
  }
}

module.exports = new TradingViewController();
