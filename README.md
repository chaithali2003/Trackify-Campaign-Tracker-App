# Trackify - Campaign Tracker App

A full-stack web application for tracking and managing marketing campaigns. Built with React, Node.js, Express, and MongoDB.

## Features

- ✅ **Campaign Management**: Add, view, update, and delete marketing campaigns
- ✅ **Status Tracking**: Track campaign status (Active, Paused, Completed)
- ✅ **Dashboard**: Overview of campaign statistics
- ✅ **Search & Filter**: Search campaigns by name and filter by status
- ✅ **Responsive Design**: Modern UI that works on all devices
- ✅ **Authentication**: Basic login system (demo credentials)

## Tech Stack

- **Frontend**: React 18 + Vite + Axios
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Styling**: Custom CSS with modern gradients and responsive design

## Project Structure

```
Trackify/
├── backend/
│   ├── models/
│   │   └── Campaign.js
│   ├── routes/
│   │   └── campaigns.js
│   ├── config.env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CampaignForm.jsx
│   │   │   └── CampaignList.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## API Endpoints

- `POST /api/campaigns` - Create a new campaign
- `GET /api/campaigns` - Get all campaigns
- `PATCH /api/campaigns/:id` - Update campaign status
- `DELETE /api/campaigns/:id` - Delete a campaign

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone and Navigate to Project

```bash
cd Trackify
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
# Copy config.env and update MongoDB connection string if needed
# Default: mongodb://localhost:27017/trackify

# Start the server
npm run dev
# or
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 4. Database Setup

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- The app will automatically create the `trackify` database

**Option B: MongoDB Atlas**
- Create a MongoDB Atlas account
- Create a cluster
- Update the `MONGODB_URI` in `backend/config.env`

## Usage

1. **Login**: Use demo credentials `admin` / `password`
2. **Dashboard**: View campaign statistics
3. **Add Campaign**: Fill out the form to create a new campaign
4. **Manage Campaigns**: Update status or delete campaigns from the table
5. **Search & Filter**: Use the search bar and status filter to find specific campaigns

## Campaign Fields

- **Campaign Name**: Name of the marketing campaign
- **Client Name**: Name of the client
- **Start Date**: When the campaign starts
- **Status**: Active, Paused, or Completed

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Uses Vite for fast development
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## Environment Variables

Create a `config.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/trackify
PORT=5000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is built as part of a technical assessment.
