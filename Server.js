const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SwaaddB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Server running on port ${5000}`));

// login and signup

const User = require('./models/User'); // Adjust the path as necessary

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        // In production, use bcrypt to hash the password
        const user = new User({ username, password });
        await user.save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && user.password === password) {
            // In production, use bcrypt to compare the password
            res.status(200).send({ message: "Login successful" });
        } else {
            res.status(401).send({ message: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

//////////////////////////////

const Product = require('./models/productModel');

// Add a new product
app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});


//routes to manage
const Cart = require('./models/cartModel');

// Add item to cart
app.post('/cart/add', async (req, res) => {
    const { userId, productId, quantity, price } = req.body;
    const total = quantity * price;

    try {
        let cart = await Cart.findOne({ userId });
        if (cart) {
            // User already has a cart
            let itemIndex = cart.items.findIndex(item => item.productId == productId);
            if (itemIndex > -1) {
                // Product exists in cart, update the quantity
                let cartItem = cart.items[itemIndex];
                cartItem.quantity += quantity;
                cartItem.price = price;
                cart.items[itemIndex] = cartItem;
            } else {
                // Product does not exist in cart, add new item
                cart.items.push({ productId, quantity, price });
            }
            cart.total += total;
            await cart.save();
        } else {
            // No cart for user, create new cart
            const newCart = await Cart.create({
                userId,
                items: [{ productId, quantity, price }],
                total
            });
            cart = newCart;
        }
        res.status(201).send(cart);
    } catch (error) {
        res.status(500).send("Error adding item to cart: " + error);
    }
});

// Get cart for a user
app.get('/cart/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send("Error fetching cart: " + error);
    }
});

