const router = require('express').Router();
const { binanceController } = require('../../controllers');

router.get('/account', binanceController.getInfo);

module.exports = router;
