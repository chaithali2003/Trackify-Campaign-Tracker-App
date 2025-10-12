const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');

// GET /api/campaigns - Get all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/campaigns - Create a new campaign
router.post('/', async (req, res) => {
  try {
    const { campaignName, clientName, startDate, status } = req.body;
    
    if (!campaignName || !clientName || !startDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const campaign = new Campaign({
      campaignName,
      clientName,
      startDate,
      status: status || 'Active'
    });

    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/campaigns/:id - Update campaign status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['Active', 'Paused', 'Completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/campaigns/:id - Delete a campaign
router.delete('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
