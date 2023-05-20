const Category = require('../models/category');

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if(!categories) {
            res.status(404).json({
                success: false,
                error: 'Category not found',
            });
        }
        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category) {
            res.status(404).json({
                success: false,
                error: 'Category not found',
            });
        }
        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);

        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        if(req.user.id !== req.body.addBy){
            return res.status(403).json({msg: "You are not allowed to do this"});
        }
        const updateCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
        if(!updateCategory) {
            res.status(404).json({
                success: false,
                error: 'Category not found',
            });
        }
        res.status(200).json({
            success: true,
            data: updateCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        if(req.user.id !== req.body.addBy){
            return res.status(403).json({msg: "You are not allowed to do this"});
        }
        const category = await Category.findByIdAndDelete(req.params.id);
        if(!category) {
            res.status(404).json({
                success: false,
                error: 'Category not found',
            });
        }
        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

