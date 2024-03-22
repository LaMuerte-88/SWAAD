const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    }
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: String, // Use mongoose.Schema.Types.ObjectId for real user models
        required: true
    },
    items: [cartItemSchema],
    total: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Cart', cartSchema);
