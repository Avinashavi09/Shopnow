const express = require('express');
const {Order} = require('../models/Order/Order');
const { Product } = require('../models/Product/Product');
const { Seller } = require('../models/Seller/Seller');
const { InvoiceCounter } = require('../models/InvoiceCounter/InvoiceCounter');
const router = express.Router();

// Helper function to get the next invoice number
const getNextInvoiceNumber = async () => {
    const result = await InvoiceCounter.findOneAndUpdate(
        {}, // Since we only need one document, an empty filter is fine
        { $inc: { invoiceNumber: 1 } }, // Increment invoiceNumber by 1
        { new: true, upsert: true } // Ensure it creates the counter if not exists
    );
    return result.invoiceNumber;
};

router.post('/orders', async (req, res) => {
    const { consumerId, sellerId, productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the product for the specific seller
        const sellerProduct = product.sellerProducts.find(sp => sp.seller.toString() === sellerId);
        if (!sellerProduct) {
            return res.status(404).json({ message: 'Seller not selling this product' });
        }

        // Check if there's enough stock
        if (sellerProduct.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        // Generate the next invoice number
        const invoiceNumber = await getNextInvoiceNumber();

        const totalPrice = quantity * sellerProduct.price;

        // Create a new order
        const order = new Order({
            consumer: consumerId,
            seller: sellerId,
            product: productId,
            quantity: quantity,
            totalPrice: totalPrice,
            invoiceNumber: invoiceNumber
        });

        // Decrement stock
        sellerProduct.stock -= quantity;

        // Save the updated product and the new order
        await product.save();
        await order.save();

        res.status(201).json({
            message: 'Order created successfully',
            order: order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('consumer', 'name')
            .populate('seller', 'name')
            .populate('product', 'name')
            .lean();

        res.status(200).json({
            message: 'Orders retrieved successfully',
            orders: orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId)
            .populate('consumer', 'name')
            .populate('seller', 'name')
            .populate('product', 'name')
            .lean();

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order retrieved successfully',
            order: order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.put('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { quantity, status } = req.body;

    try {
        let order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (quantity) {
            // Find the product and calculate the new total price
            const product = await Product.findById(order.product);
            const sellerProduct = product.sellerProducts.find(sp => sp.seller.toString() === order.seller.toString());

            if (!sellerProduct) {
                return res.status(404).json({ message: 'Seller not selling this product anymore' });
            }

            order.quantity = quantity;
            order.totalPrice = quantity * sellerProduct.price;
        }

        if (status) {
            order.status = status;
        }

        order.updatedAt = Date.now();
        await order.save();

        res.status(200).json({
            message: 'Order updated successfully',
            order: order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order deleted successfully',
            order: order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports =router;