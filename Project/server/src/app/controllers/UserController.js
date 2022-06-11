const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Users, Payments } = require('../models')
const Validations = require('../validations')



class UserController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body

            // Validate Email
            if (!Validations.validateEmail(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'The Email is invalid'
                })
            }

            // Check Email exists
            const user = await Users.findOne({ email })
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'The email already exists.'
                })
            }

            // Check password length
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Password is at least 6 characters.'
                })
            }

            // hash password
            const passwordHash = await bcrypt.hash(password, 10)

            // create new User
            const newUser = new Users({ name, email, password: passwordHash })

            // save new user
            await newUser.save()

            // Create jsonwebtoken to authentication
            const accessToken = createAccessToken({ userId: newUser._id })

            // respont client
            res.status(200).json({
                success: true,
                message: 'Register Successfully',
                accessToken,
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            console.log(email, password)

            //Check user exists
            const user = await Users.findOne({ email })
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Username or password incorrect.",
                })
            }

            // Check password match
            const isMatch = await bcrypt.compare(password, user.password)

            // Incorrect password
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Username or password incorrect.",
                })
            }

            // Login success

            // Create jsonwebtoken to authentication
            const accessToken = createAccessToken({ userId: user._id })

            // respont client
            res.status(200).json({
                success: true,
                message: 'Login Successfully',
                accessToken,
            })

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    async refreshToken(req, res) {
        const accessToken = createAccessToken({ userId: req.userId })

        // respont client
        res.status(200).json({
            success: true,
            message: 'Login Successfully',
            accessToken,
        })
    }

    async getUser(req, res) {
        try {
            const user = await Users.findById(req.userId).select('-password')

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User does not exists"
                })
            }
            res.status(200).json({
                success: true,
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async addCart(req, res) {
        try {
            const user = await Users.findById(req.userId)

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'User does not exists.'
                })
            }

            await Users.findOneAndUpdate({ _id: user._id }, { cart: req.body.cart })

            return res.json({
                success: true,
                message: 'Added to cart.'
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async history(req, res) {
        try {
            const history = await Payments.find({ userId: req.userId })
            res.json({
                success: true,
                history,
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

const createAccessToken = (user) => {
    const accessToken = process.env.ACCESS_TOKEN_SECRET
    const options = { expiresIn: '7d' }
    return jwt.sign(user, `${accessToken}`, options)
}


module.exports = new UserController