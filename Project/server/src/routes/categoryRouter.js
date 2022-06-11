const router = require('express').Router()
const { categoryController } = require('../app/controllers')
const { auth, authAdmin } = require('../app/middlewares')

router.route('/category')
    .get(categoryController.getCategories)
    .post(auth, authAdmin, categoryController.createCategory)

router.route('/category/:id')
    .delete(auth, authAdmin, categoryController.deleteCategory)
    .put(auth, authAdmin, categoryController.updateCategory)


module.exports = router