const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config.env' }); // Ensure .env file is loaded locally

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('❌ MONGODB_URI is not defined! Please set it in your environment variables.');
  process.exit(1); // Stop server if MongoDB URI is missing
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/campaigns', require('./routes/campaigns'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Trackify API is running!' });
});

// Data viewer route
app.get('/api/data-viewer', async (req, res) => {
  try {
    const Campaign = require('./models/Campaign');
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json({
      message: 'MongoDB Data Viewer',
      database: 'trackify',
      collection: 'campaigns',
      count: campaigns.length,
      data: campaigns
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log('📊 Using MongoDB for persistent storage');
});
