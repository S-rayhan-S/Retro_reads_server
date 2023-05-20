const Review = require('../models/review');

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        if(!reviews) {
            res.status(404).json({
                success: false,
                error: 'Review not found',
            });
        }
        res.status(200).json({
            success: true,
            data: reviews,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if(!review) {
            res.status(404).json({
                success: false,
                error: 'Review not found',
            });
        }
        res.status(200).json({
            success: true,
            data: review,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);

        res.status(200).json({
            success: true,
            data: review,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.updateReview = async (req, res) => {
    try{
        if(req.user.id !== req.body.user) {
            res.status(401).json({ 
                success: false,
                error: 'Not authorized to update review',
            });
        }
        const updateReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
        if(!updateReview) {
            res.status(404).json({
                success: false,
                error: 'Review not found',
            });
        }
        res.status(200).json({
            success: true,
            data: updateReview,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });

    }
};


exports.deleteReview = async (req, res) => {
    try {
        if(req.user.id !== req.body.user) {
            res.status(401).json({ 
                success: false,
                error: 'Not authorized to update review',
            });
        }
        const review = await Review.findByIdAndDelete(req.params.id);
        if(!review) {
            res.status(404).json({
                success: false,
                error: 'Review not found',
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

