const { Payments, Users, Products } = require('../models')

class PaymentController {
    async getPayments(req, res) {
        try {
            const payments = await Payments.find()
            res.json({
                success: true,
                payments,
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async createPayment(req, res) {
        try {
            const user = await Users.findById(req.userId).select('name email')

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'User does not exist'
                })
            }

            const { cart, paymentID, address } = req.body
            const { _id, name, email } = user
            const newPayment = new Payments({ userId: _id, name, email, cart, paymentID, address })

            cart.forEach(item => sold(item._id, item.quantity, item.sold))

            await newPayment.save()
            res.json({ newPayment })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

}

const sold = async (id, quantity, oldSold) => {
    await Products.findOneAndUpdate({ _id: id }, {
        sold: quantity + oldSold
    })
}


module.exports = new PaymentController