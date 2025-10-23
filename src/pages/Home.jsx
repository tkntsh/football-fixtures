import React, { useState } from 'react';
import MatchCard from '../components/MatchCard';
import ResultsCard from '../components/ResultsCard';
import LeagueTable from '../components/LeagueTable';
import PlayerStats from '../components/PlayerStats';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function Home({ data, loading, error }) {
  const [activeTab, setActiveTab] = useState('fixtures');

  const tabs = [
    { id: 'fixtures', label: 'Fixtures' },
    { id: 'results', label: 'Results' },
    { id: 'table', label: 'Table' },
    { id: 'stats', label: 'Stats' },
  ];

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-teal-600">
      <header className="bg-blue-900 text-white py-6 shadow-lg sticky top-0 z-10 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center">English Premier League</h1>
        <p className="text-center text-blue-200 mt-2 text-lg">Live Updates & Stats for 2025/26</p>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <nav className="flex justify-center mb-8 sticky top-[104px] z-10 bg-gradient-to-b from-teal-600 to-transparent py-4">
          <div className="flex space-x-2 bg-opacity-10 backdrop-blur-md p-2 rounded-full shadow-md">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'glass text-white animate-slide-underline active'
                    : 'text-gray-700 bg-white hover:bg-gray-100 animate-slide-underline'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="space-y-6 animate-fade-in">
          {activeTab === 'fixtures' && (
            <div className="space-y-4">
              {data.fixtures.length === 0 ? (
                <p className="text-center text-gray-300 text-lg glass p-4 rounded-lg">No upcoming fixtures.</p>
              ) : (
                data.fixtures.map((match) => <MatchCard key={match.id} match={match} />)
              )}
            </div>
          )}
          {activeTab === 'results' && (
            <div className="space-y-4">
              {data.results.length === 0 ? (
                <p className="text-center text-gray-300 text-lg glass p-4 rounded-lg">No recent results.</p>
              ) : (
                data.results.map((match) => <ResultsCard key={match.id} match={match} />)
              )}
            </div>
          )}
          {activeTab === 'table' && <LeagueTable standings={data.standings} />}
          {activeTab === 'stats' && <PlayerStats stats={data.playerStats} />}
        </div>
      </main>
    </div>
  );
}

export default Home;