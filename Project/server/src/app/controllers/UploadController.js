const cloudinary = require('cloudinary')
const fs = require('fs')


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const removeTmpFile = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err
    })
}

class UploadController {
    upload(req, res) {
        try {
            const files = req.files
            if (!files || Object.keys(files).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'No files were uploaded'
                })
            }
            console.log(files);

            const file = files.file

            // if file size more than 5mb
            if (file.size > 1024 * 1024 * 5) {
                removeTmpFile(file.tempFilePath)
                return res.status(400).json({
                    success: false,
                    message: 'Size too large'
                })
            }

            // if file size more than 5mb
            if (file.size < 1024 * 15) {
                removeTmpFile(file.tempFilePath)
                return res.status(400).json({
                    success: false,
                    message: 'Size too small'
                })
            }

            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                removeTmpFile(file.tempFilePath)
                return res.status(400).json({
                    success: false,
                    message: 'File format is incorrect.'
                })
            }

            cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'test' }, async (error, result) => {
                if (error) {
                    return res.status(400).json({
                        success: false,
                        message: error.message
                    })
                }

                removeTmpFile(file.tempFilePath)
                res.json({
                    success: true,
                    data: {
                        public_id: result.public_id,
                        url: result.secure_url,

                    }
                })
            })

        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    destroy(req, res) {
        try {
            const { public_id } = req.body

            if (!public_id) {
                return res.status(400).json({
                    success: false,
                    message: 'No image Selected'
                })
            }

            cloudinary.v2.uploader.destroy(public_id, async (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error.message
                    })
                }

                res.json({
                    success: true,
                    message: 'Deleted Image'
                })
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }

    }
}

module.exports = new UploadController