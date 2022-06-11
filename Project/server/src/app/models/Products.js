const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    images: {
        type: Object,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        default: false,
    },
    sold: {
        type: Number,
        default: 0,
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Products', productSchema)