const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trackify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log('📊 Using MongoDB for persistent storage');
});
