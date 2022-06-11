const { Users } = require('../models/index')


const authAdmin = async (req, res, next) => {
    try {
        // Get user information by Id
        const user = await Users.findOne({
            _id: req.userId
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exists"
            })
        }

        if (user.role === 0) {
            return res.status(400).json({
                success: false,
                message: "Access Denied"
            })
        }

        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = authAdmin