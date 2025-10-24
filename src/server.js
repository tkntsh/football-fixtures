const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for development (optional)
app.use(express.json());

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// Proxy API calls to Football-Data.org
app.use('/api/v4', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `https://api.football-data.org/v4${req.url}`,
      headers: {
        'X-Auth-Token': process.env.REACT_APP_FOOTBALLDATA_API_KEY,
      },
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Serve React app for all non-API routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});