require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const instanceApp = () => {
    const app = express()

    app.use(express.urlencoded({
        extended: true
    }))

    app.use(express.json())

    app.use(cookieParser())

    app.use(cors())

    app.use(fileUpload({
        useTempFiles: true,
    }))

    return app
}

module.exports = instanceApp