import React, { useState } from 'react';

const CampaignForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    campaignName: '',
    clientName: '',
    startDate: '',
    status: 'Active'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      campaignName: '',
      clientName: '',
      startDate: '',
      status: 'Active'
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="campaignName">Campaign Name</label>
        <input
          type="text"
          id="campaignName"
          name="campaignName"
          value={formData.campaignName}
          onChange={handleChange}
          required
          placeholder="Enter campaign name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="clientName">Client Name</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
          placeholder="Enter client name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button type="submit" className="btn" disabled={loading}>
        {loading ? 'Adding...' : 'Add Campaign'}
      </button>
    </form>
  );
};

export default CampaignForm;
