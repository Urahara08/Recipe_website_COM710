const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Atlas connection
const mongoURI = 'mongodb+srv://tomandrewsdev:Bankai1234@cluster0.dpytrg9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// User schema and model
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Signup route
app.post('/signup', async (req, res) => {
    const { firstname, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ firstname, email, password: hashedPassword });
        await newUser.save();

        // Generate a JWT token (optional)
        const token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });

        // Send a JSON response with the token and user info
        res.status(201).json({
            message: 'Signup successful.',
            token,
            user: {
                email: newUser.email,
                firstname: newUser.firstname,
            },
        });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: 'Email already exists.' });
        } else {
            res.status(500).json({ message: 'Server error.' });
        }
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Generate a JWT token (optional)
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        // Send a JSON response with the token and user info
        res.status(200).json({
            message: 'Login successful.',
            token,
            user: {
                email: user.email,
                firstname: user.firstname,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const path = require('path'); // Import the path module

