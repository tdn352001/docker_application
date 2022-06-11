const { Products } = require('../models/')


class ApiFeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    filtering() {
        const queryObject = { ...this.queryString }
        const excludedFields = ['page', 'sort', 'limit']

        // Remove page, sort and limit in params
        excludedFields.forEach(el => {
            delete (queryObject[el])
        })

        let queryStr = JSON.stringify(queryObject)
        console.log(queryStr)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        console.log(queryStr)
        this.query.find(JSON.parse(queryStr))
        console.log(this)

        return this
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 8
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)

        return this
    }
}


class ProductController {
    async getProducts(req, res) {
        try {
            const features = new ApiFeatures(Products.find(), req.query).filtering().sorting().paginating()
            const products = await features.query

            res.json({
                success: true,
                products,
                result: products.length
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async createProduct(req, res) {
        try {
            const { productId, title, price, description, content, images, category } = req.body

            if (!images) {
                return res.status(400).json({
                    success: false,
                    message: 'No image uploaded'
                })
            }

            const product = await Products.findOne({ productId })
            if (product) {
                return res.status(400).json({
                    success: false,
                    message: 'This product already exists.',
                })
            }


            const newProduct = new Products({
                productId, title: title.toLowerCase(), price, description, content, images, category
            })
            await newProduct.save()

            res.json({
                success: true,
                product: newProduct
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }

    }

    async updateProduct(req, res) {
        try {
            const id = req.params.id
            const { title, price, description, content, images, category } = req.body

            if (!images) {
                return res.status(400).json({
                    success: false,
                    message: 'No image uploaded'
                })
            }

            const updatedProduct = await Products.findOneAndUpdate({ _id: id }, {
                title: title.toLowerCase(), price, description, content, images, category
            }, {
                new: true
            })

            res.json({
                success: true,
                product: updatedProduct
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params
            await Products.findByIdAndDelete(id)
            res.json({ success: true, message: 'Deleted Product' })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}


module.exports = new ProductController