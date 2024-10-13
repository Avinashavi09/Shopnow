const express = require("express");
const { Category } = require("../models/Category/Category");
const { Product } = require("../models/Product/Product");
const { Seller } = require("../models/Seller/Seller");
const multer = require("multer");
const router = express.Router();

// GET ALL REVIEWS FOR A PRODUCT BY A SELLER
router.get('/products/:productId/sellers/:sellerId/reviews', async (req, res) => {
    const { productId, sellerId } = req.params;

    try {
        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the seller's product details within the product
        const sellerProduct = product.sellerProducts.find(sp => sp.seller.toString() === sellerId);
        if (!sellerProduct) {
            return res.status(404).json({ message: 'Seller does not sell this product' });
        }

        // Return the reviews for the seller's product
        res.status(200).json({
            message: 'Reviews fetched successfully',
            reviews: sellerProduct.reviews
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// MODIFY CUSTOMER REVIEW
router.put('/products/:productId/seller/:sellerId/reviews/:reviewId', async (req, res) => {
    const { productId, sellerId, reviewId } = req.params;
    const { rating, comment } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const sellerProduct = product.sellerProducts.find(sp => sp.seller.toString() === sellerId);
        if (!sellerProduct) {
            return res.status(404).json({ message: 'Seller does not sell this product' });
        }

        const review = sellerProduct.reviews.find(r => r._id.toString() === reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Update the review details
        review.rating = rating || review.rating;
        review.comment = comment || review.comment;

        await product.save();
        res.status(200).json({ message: 'Review updated successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE CUSTOMER REVIEW
router.delete('/products/:productId/seller/:sellerId/reviews/:reviewId', async (req, res) => {
    const { productId, sellerId, reviewId } = req.params;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const sellerProduct = product.sellerProducts.find(sp => sp.seller.toString() === sellerId);
        if (!sellerProduct) {
            return res.status(404).json({ message: 'Seller does not sell this product' });
        }

        const reviewIndex = sellerProduct.reviews.findIndex(r => r._id.toString() === reviewId);
        if (reviewIndex === -1) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Remove the review
        sellerProduct.reviews.splice(reviewIndex, 1);

        await product.save();
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;