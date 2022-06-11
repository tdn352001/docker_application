const router = require('express').Router()
const { paymentController } = require('../app/controllers')
const { auth, authAdmin } = require('../app/middlewares')

router.route('/payment')
    .get(auth, authAdmin, paymentController.getPayments)
    .post(auth, paymentController.createPayment)



module.exports = router