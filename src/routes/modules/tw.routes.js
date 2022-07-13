const router = require('express').Router();
const { twController } = require('../../controllers');

router.get('/balance', twController.getBalance);
router.get('/positions', twController.getPositions);
router.post('/', twController.getTwHook);

module.exports = router;
