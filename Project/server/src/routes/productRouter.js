const router = require('express').Router()
const { productController } = require('../app/controllers')
const { auth, authAdmin } = require('../app/middlewares')


router.route('/products')
    .get(productController.getProducts)
    .post(auth, authAdmin, productController.createProduct)


router.route('/products/:id')
    .put(auth, authAdmin, productController.updateProduct)
    .delete(auth, authAdmin, productController.deleteProduct)


module.exports = router