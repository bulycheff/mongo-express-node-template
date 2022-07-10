const router = require('express').Router();
const { twController } = require('../../controllers');

router.post('/:pair', twController.handleTwHook);
router.get('/data', twController.getStorageData);

module.exports = router;
