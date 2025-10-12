import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load campaigns from API
  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/campaigns');
      setCampaigns(response.data);
    } catch (err) {
      setError('Failed to load campaigns');
      console.error('Error loading campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new campaign
  const addCampaign = async (campaignData) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/campaigns', campaignData);
      setCampaigns([response.data, ...campaigns]);
      setSuccess('Campaign added successfully!');
      setError('');
    } catch (err) {
      setError('Failed to add campaign');
      console.error('Error adding campaign:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update campaign status
  const updateCampaignStatus = async (id, status) => {
    try {
      setLoading(true);
      const response = await axios.patch(`/api/campaigns/${id}`, { status });
      setCampaigns(campaigns.map(campaign => 
        campaign._id === id ? response.data : campaign
      ));
      setSuccess('Campaign status updated successfully!');
      setError('');
    } catch (err) {
      setError('Failed to update campaign status');
      console.error('Error updating campaign:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete campaign
  const deleteCampaign = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) {
      return;
    }
    
    try {
      setLoading(true);
      await axios.delete(`/api/campaigns/${id}`);
      setCampaigns(campaigns.filter(campaign => campaign._id !== id));
      setSuccess('Campaign deleted successfully!');
      setError('');
    } catch (err) {
      setError('Failed to delete campaign');
      console.error('Error deleting campaign:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load campaigns when component mounts and user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      loadCampaigns();
    }
  }, [isLoggedIn]);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Trackify</h1>
        <p>Campaign Tracker App</p>
        <button 
          className="btn" 
          onClick={() => setIsLoggedIn(false)}
          style={{ marginTop: '20px' }}
        >
          Logout
        </button>
      </header>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <Dashboard campaigns={campaigns} />

      <div className="card">
        <h2>Add New Campaign</h2>
        <CampaignForm onSubmit={addCampaign} loading={loading} />
      </div>

      <div className="card">
        <h2>Campaigns</h2>
        <CampaignList 
          campaigns={campaigns}
          onUpdateStatus={updateCampaignStatus}
          onDelete={deleteCampaign}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
