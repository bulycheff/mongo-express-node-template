const router = require('express').Router()
const { userController } = require('../controllers')

router.post('/', userController.create)
router.get('/', userController.getAll)
router.get('/:id', userController.getById)

module.exports = router