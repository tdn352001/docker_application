const { Category } = require('../models')

class CategoryController {
    async getCategories(req, res) {
        try {
            const categories = await Category.find()

            res.json({
                success: true,
                categories
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async createCategory(req, res) {
        try {
            const { name } = req.body

            // Check Category exists
            const category = await Category.findOne({ name })
            if (category) {
                return res.status(400).json({
                    success: false,
                    message: "This category already exists."
                })
            }

            // Create a new category
            const newCategory = new Category({ name })
            // Save the new category
            await newCategory.save()

            res.json({
                success: true,
                category: newCategory
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async deleteCategory(req, res) {
        try {
            const { id } = req.params
            const category = await Category.findByIdAndDelete(id)
            res.json({
                success: true,
                message: 'Category deleted',
                category
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async updateCategory(req, res) {
        try {
            const { id } = req.params
            const { name } = req.body

            const category = await Category.findOne({ name })
            if (category) {
                return res.status(400).json({
                    success: false,
                    message: "This category already exists."
                })
            }

            const updateCategory = await Category.findByIdAndUpdate({ _id: id }, { name }, { new: true })
            res.json({
                success: true,
                message: 'Category updated',
                category: updateCategory
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

module.exports = new CategoryController