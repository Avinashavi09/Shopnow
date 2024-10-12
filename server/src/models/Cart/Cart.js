const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    consumer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
        required: true,
    },
    cartItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller', // Add sellerId reference to the cart item
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    }],
    totalPrice: {
        type: Number,
        default: 0,
    }
});

cartSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

cartSchema.set('toJSON', {
    virtuals: true,
});

exports.Cart = mongoose.model('Cart', cartSchema);
