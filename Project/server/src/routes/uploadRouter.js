const router = require('express').Router()
const { uploadController } = require('../app/controllers')
const { auth, authAdmin } = require('../app/middlewares')

router.post('/upload', auth, authAdmin, uploadController.upload)
router.post('/destroy', auth, authAdmin, uploadController.destroy)


module.exports = router