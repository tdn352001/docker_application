const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access token not found'
        })
    }

    try {
        const accessToken = process.env.ACCESS_TOKEN_SECRET
        const decoded = jwt.verify(token, accessToken)
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log({ error })
        res.status(403).json({
            success: false,
            message: 'Invalid Token'
        })
    }
}

module.exports = auth