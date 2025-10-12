import React, { useState } from 'react';

const CampaignList = ({ campaigns, onUpdateStatus, onDelete, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter campaigns based on search term and status
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Paused':
        return 'status-paused';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '20px' }}>Loading campaigns...</p>
      ) : filteredCampaigns.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          {campaigns.length === 0 ? 'No campaigns found. Add your first campaign!' : 'No campaigns match your search criteria.'}
        </p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Client Name</th>
                <th>Start Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map(campaign => (
                <tr key={campaign._id}>
                  <td>{campaign.campaignName}</td>
                  <td>{campaign.clientName}</td>
                  <td>{formatDate(campaign.startDate)}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <select
                        value={campaign.status}
                        onChange={(e) => onUpdateStatus(campaign._id, e.target.value)}
                        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
                      >
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button
                        className="btn btn-danger"
                        onClick={() => onDelete(campaign._id)}
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CampaignList;
