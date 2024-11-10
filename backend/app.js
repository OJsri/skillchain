const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true, // Allow cookies if needed
}))

// Database connection
mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('MongoDB connection error:', error));

// Routes
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));