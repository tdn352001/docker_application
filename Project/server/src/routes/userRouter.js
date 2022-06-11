const router = require('express').Router()
const { userController } = require('../app/controllers')
const { auth } = require('../app/middlewares')


router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/refresh-token', auth, userController.refreshToken)
router.get('/information', auth, userController.getUser)
router.patch('/addcart', auth, userController.addCart)
router.get('/history', auth, userController.history)


module.exports = router