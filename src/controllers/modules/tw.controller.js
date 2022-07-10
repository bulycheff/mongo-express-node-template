require('../../../localStorage.js');

class TwController {
  //methods
  static async push(data) {
    const dataItem = {
      ...data,
      date: new Date(Date.now()),
    };
    let currentData;
    const storage = localStorage.getItem('tradingView');
    if (storage) {
      currentData = JSON.parse(localStorage.getItem('tradingView'));
    } else {
      currentData = [];
    }
    currentData.push(dataItem);
    await localStorage.setItem('tradingView', JSON.stringify(currentData));
  }
  
  
  //getters
  static get data() {
    const data = JSON.parse(localStorage.getItem('tradingView'));
    return data ?? [];
  }
  
  // handlers
  async handleTwHook(req, res) {
    console.log({
      host: req.host,
      path: req.path,
      params: req.params,
      query: req.query,
      oirinalUrl: req.originalUrl,
      body: req.body,
      url: req.url,
      fullPath: req.baseUrl + req.path,
    });
    try {
      const { push } = TwController;
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
      const response = { success: true, data: TwController.data };
      res.json(response).status(200);
    } catch (e) {
      const response = { success: false, data: { error: e.message } };
      console.log(response);
      res.json(response).status(400);
    }
  }
}

module.exports = new TwController();
