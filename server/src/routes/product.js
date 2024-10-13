const express = require('express');
const {Category} = require('../models/Category/Category');
const { Product } = require('../models/Product/Product');
const { Seller } = require('../models/Seller/Seller');
const router = express.Router();

// API to retrieve sellers for a specific product
router.get('/products/:productId/sellers', async (req, res) => {
    const { productId } = req.params;

    try {
        // Find the product and populate the seller details
        const product = await Product.findById(productId).populate({
            path: 'sellerProducts.seller',
            select: 'name email phone', // Select the required seller fields
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Send the list of sellers selling this product
        res.status(200).json({
            productName: product.name,
            sellers: product.sellerProducts.map(sellerProduct => ({
                seller: sellerProduct.seller,
                price: sellerProduct.price,
                rating: sellerProduct.sellerRating,
                stock: sellerProduct.stock
            }))
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/seller/:sellerId/products', async (req, res) => {
    const { sellerId } = req.params;

    try {
        // Find all products where the seller has entries in the sellerProducts array
        const products = await Product.find({ 'sellerProducts.seller': sellerId })
            .populate('category', 'name') // Populate the category name for each product
            .lean(); // Use lean for better performance since we are just reading data

        // Format the products to the desired structure
        const formattedProducts = products.map(product => {
            // Find the seller-specific details for this seller from sellerProducts array
            const sellerProduct = product.sellerProducts.find(sp => sp.seller.toString() === sellerId);

            return {
                id: product._id,
                name: product.name,
                category: product.category.name, // Assuming category is populated with the 'name'
                mrp: product.mrp || 'N/A', // Assuming 'mrp' exists or defaults to 'N/A'
                price: sellerProduct ? sellerProduct.price : 'N/A',
                stock: sellerProduct ? sellerProduct.stock : 'N/A',
                status: sellerProduct && sellerProduct.stock > 0 ? 'In Stock' : 'Out of Stock'
            };
        });

        if (formattedProducts.length === 0) {
            return res.status(404).json({ message: 'No products found for this seller' });
        }

        res.status(200).json({
            message: `Products found for seller ${sellerId}`,
            products: formattedProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// API to add a product for a seller
router.post('/seller/:sellerId/products', async (req, res) => {
    const { sellerId } = req.params;
    console.log(sellerId)
    const { productName, category, mrp, description, sellerPrice, stock, purchasePrice } = req.body;
    console.log(req.body)

    try {
        // Find the seller by ID
        const seller = await Seller.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        // Check if the category exists
        const categoryObj = await Category.findById(category);
        if (!categoryObj) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Check if the product already exists in the Product collection
        let product = await Product.findOne({ name: productName, category: category });

        if (!product) {
            // If product does not exist, create a new product
            product = new Product({
                name: productName,
                category: categoryObj._id,  // Reference the category's ObjectId
                mrp: mrp,
                description: description,
                globalRating: 0, // Initial rating for a new product
                sellerProducts: []
            });

            await product.save();
        }

        // Check if the seller is already associated with the product
        const sellerProduct = product.sellerProducts.find(
            sp => sp.seller.toString() === sellerId
        );

        if (sellerProduct) {
            return res.status(400).json({ message: 'Seller is already selling this product' });
        }

        // Add seller-specific product details
        product.sellerProducts.push({
            seller: sellerId,
            sellerRating: 0, // Initial rating for the seller's product
            price: sellerPrice,
            stock: stock,
            purchasePrice: purchasePrice,
        });

        // Save the product with the new seller's details
        await product.save();

        // Update the seller's product list
        seller.products.push({
            product: product._id,
            price: sellerPrice,
            rating: 0, // Initial rating for the seller's product
            stock: stock
        });

        await seller.save();

        res.status(201).json({
            message: 'Product added successfully for the seller',
            product: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// API to add a review for a product sold by a specific seller
router.post('/products/:productId/sellers/:sellerId/reviews', async (req, res) => {
    const { productId, sellerId } = req.params;
    const { consumerId, rating, comment } = req.body;

    try {
        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the seller's specific product in the sellerProducts array
        const sellerProduct = product.sellerProducts.find(sp => sp.seller.toString() === sellerId);
        if (!sellerProduct) {
            return res.status(404).json({ message: 'Seller for this product not found' });
        }

        // Check if the consumer exists
        const consumer = await Consumer.findById(consumerId);
        if (!consumer) {
            return res.status(404).json({ message: 'Consumer not found' });
        }

        // Add the review to the seller's product
        const review = {
            consumer: consumerId,
            rating,
            comment
        };
        sellerProduct.reviews.push(review);
        sellerProduct.numReviews += 1;

        // Update the seller rating based on the average of reviews
        const totalRating = sellerProduct.reviews.reduce((acc, review) => acc + review.rating, 0);
        sellerProduct.sellerRating = totalRating / sellerProduct.numReviews;

        // Save the updated product document
        await product.save();

        res.status(201).json({ message: 'Review added successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports =router;