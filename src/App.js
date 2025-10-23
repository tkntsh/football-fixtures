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
        const headers = { 'X-Auth-Token': process.env.REACT_APP_FOOTBALLDATA_API_KEY };

        // Use /api/v4/... for proxy (Vercel function or local package.json proxy)
        const baseURL = '/api';

        // Fixtures: Upcoming matches (2025/26 season)
        console.log('Fetching fixtures for 2025/26...');
        const fixturesRes = await axios.get(`${baseURL}/v4/competitions/PL/matches?status=SCHEDULED&season=2025`, { headers });
        const fixtures = fixturesRes.data.matches || [];
        console.log('Fixtures Response:', fixturesRes.data);

        // Results: Past matches (last 10, 2025/26 season)
        console.log('Fetching results for 2025/26...');
        const resultsRes = await axios.get(`${baseURL}/v4/competitions/PL/matches?status=FINISHED&season=2025`, { headers });
        const now = new Date();
        const recentResults = resultsRes.data.matches
          ?.filter(match => new Date(match.utcDate) < now)
          .sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate))
          .slice(0, 10) || [];
        console.log('Results Response:', resultsRes.data);

        // Standings: League table (2025/26 season)
        console.log('Fetching standings for 2025/26...');
        const standingsRes = await axios.get(`${baseURL}/v4/competitions/PL/standings?season=2025`, { headers });
        const standings = standingsRes.data.standings?.[0]?.table || [];
        console.log('Standings Response:', standingsRes.data);

        // Player Stats: Top scorers (2025/26 season)
        console.log('Fetching player stats for 2025/26...');
        const statsRes = await axios.get(`${baseURL}/v4/competitions/PL/scorers?season=2025`, { headers });
        const playerStats = statsRes.data.scorers || [];
        console.log('Player Stats Response:', statsRes.data);

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
          : `Network Error: Check API key or connection.`;
        setError(errorMessage);
        setLoading(false);
        console.error('API Error:', err.response?.data || err);
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