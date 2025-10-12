import React from 'react';

const Dashboard = ({ campaigns }) => {
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const pausedCampaigns = campaigns.filter(c => c.status === 'Paused').length;
  const completedCampaigns = campaigns.filter(c => c.status === 'Completed').length;

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h3>{totalCampaigns}</h3>
        <p>Total Campaigns</p>
      </div>
      <div className="dashboard-card">
        <h3>{activeCampaigns}</h3>
        <p>Active Campaigns</p>
      </div>
      <div className="dashboard-card">
        <h3>{pausedCampaigns}</h3>
        <p>Paused Campaigns</p>
      </div>
      <div className="dashboard-card">
        <h3>{completedCampaigns}</h3>
        <p>Completed Campaigns</p>
      </div>
    </div>
  );
};

export default Dashboard;
