const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { OAuth2Client } = require('google-auth-library');
const { Seller } = require('../models/Seller/Seller');
const { Product } = require('../models/Product/Product');
const { Consumer } = require('../models/Consumer/Consumer');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    const { email, sub: googleId } = profile._json;

    // Check if seller or consumer exists based on email
    let user = await Seller.findOne({ email }) || await Consumer.findOne({ email });

    if (!user) {
        // If no user found, create a new Consumer or Seller
        user = new Consumer({ // or Seller based on logic
            name: profile.displayName,
            email: email,
            googleId: googleId,
            authProvider: 'google',
        });

        await user.save();
    }

    return done(null, user);
}));


// Register a new seller
router.post('/register/seller', async (req, res) => {
    const { name, email, password, phone, desc, street, apartment, zip, city, country } = req.body;

    try {
        // Check if seller already exists
        let existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ message: 'Seller already registered' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new seller
        const seller = new Seller({
            name,
            email,
            passwordHash,
            phone,
            desc,
            street,
            apartment,
            zip,
            city,
            country,
            authProvider: 'local', // Default to local signup
        });

        await seller.save();

        res.status(201).json({ message: 'Seller account created successfully', sellerId: seller._id });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Register a new consumer
router.post('/register/consumer', async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        // Check if consumer already exists
        let existingConsumer = await Consumer.findOne({ email });
        if (existingConsumer) {
            return res.status(400).json({ message: 'Consumer already registered' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new consumer
        const consumer = new Consumer({
            name,
            email,
            passwordHash,
            phone,
            authProvider: 'local', // Default to local signup
        });

        await consumer.save();

        res.status(201).json({ message: 'Consumer account created successfully', consumerId: consumer._id });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});



// Routes for Google OAuth2 login
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication
        res.redirect('/dashboard');
    }
);

// Google login route
router.post('/auth/google', async (req, res) => {
    const { credential } = req.body;

    try {
        // Verify the token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });

        const payload = ticket.getPayload();
        const { email, sub: googleId, name, picture } = payload;

        // Check if the user is a Seller or Consumer
        let user = await Seller.findOne({ email }) || await Consumer.findOne({ email });

        if (!user) {
            // If no user found, decide to create either Seller or Consumer based on your logic
            user = new Consumer({
                name: name,
                email: email,
                googleId: googleId,
                photo: picture,
                authProvider: 'google',
            });
            await user.save();
        }

        // Now, generate a session or JWT token for the user and send it back
        // For simplicity, we'll just return a success message here
        res.status(200).json({ message: 'Login successful', user });

    } catch (err) {
        console.error('Error during Google login:', err);
        res.status(500).json({ message: 'Google login failed' });
    }
});



module.exports =router;