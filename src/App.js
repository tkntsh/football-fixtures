import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import './App.css';

function App() {
  const [data, setData] = useState({
    fixtures: [],
    results: [],
    standings: [],
    playerStats: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiKey = process.env.REACT_APP_FOOTBALLDATA_API_KEY;
        const headers = { 'X-Auth-Token': apiKey };

        // Use /api/v4/... for all environments; Netlify redirects handle production
        const baseURL = '/api';

        // Fixtures: Upcoming matches
        console.log('Fetching fixtures...');
        const fixturesRes = await axios.get(`${baseURL}/v4/competitions/PL/matches?status=SCHEDULED`, { headers });
        const fixtures = fixturesRes.data.matches || [];

        // Results: Past matches (last 10 for recent gameweek)
        console.log('Fetching results...');
        const resultsRes = await axios.get(`${baseURL}/v4/competitions/PL/matches?status=FINISHED`, { headers });
        const now = new Date();
        const recentResults = resultsRes.data.matches
          ?.filter(match => new Date(match.utcDate) < now)
          .sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate))
          .slice(0, 10) || [];

        // Standings: League table
        console.log('Fetching standings...');
        const standingsRes = await axios.get(`${baseURL}/v4/competitions/PL/standings`, { headers });
        const standings = standingsRes.data.standings?.[0]?.table || [];

        // Player Stats: Top scorers
        console.log('Fetching player stats...');
        const statsRes = await axios.get(`${baseURL}/v4/competitions/PL/scorers`, { headers });
        const playerStats = statsRes.data.scorers || [];

        console.log('API Data:', { fixtures, recentResults, standings, playerStats });

        setData({
          fixtures,
          results: recentResults,
          standings,
          playerStats,
        });
        setLoading(false);
      } catch (err) {
        const errorMessage = err.response
          ? `API Error: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`
          : `Network Error: Check API key, network connection, or CORS proxy settings.`;
        setError(errorMessage);
        setLoading(false);
        console.error('API Error:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Home data={data} loading={loading} error={error} />
    </div>
  );
}

export default App;