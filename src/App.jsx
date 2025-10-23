import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import './App.css';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/${process.env.REACT_APP_THESPORTSDB_API_KEY}/eventsround.php?id=4328&r=10&s=2025-2026`
        );
        setMatches(response.data.events || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch fixtures. Please try again later.');
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Home matches={matches} loading={loading} error={error} />
    </div>
  );
}

export default App;