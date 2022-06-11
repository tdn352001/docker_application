const instanceApp = require('./configs/app')
const { connectDB } = require('./configs/db')
const route = require('./routes')

const app = instanceApp()

connectDB()

route(app)

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log('Server is running on port', port)
})
