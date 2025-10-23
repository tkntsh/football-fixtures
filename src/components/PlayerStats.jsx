import React from 'react';

function PlayerStats({ stats }) {
  // Top Scorers: Direct from API
  const topScorers = stats?.slice(0, 5) || [];

  // Top Assists: Placeholder
  const topAssists = stats?.slice(0, 5).map(s => ({
    ...s,
    assists: Math.floor(Math.random() * 10),
  })) || [];

  // Clean Sheets: Placeholder
  const topCleanSheets = stats?.slice(0, 5).map(s => ({
    ...s,
    cleanSheets: Math.floor(Math.random() * 5),
  })) || [];

  return (
    <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gradient-to-r from-blue-500 to-teal-500">
        <h3 className="text-lg font-extrabold text-white bg-gradient-to-r from-blue-900 to-teal-600 p-3 rounded-t-lg -m-6 mb-4">Top Scorers</h3>
        <ul className="space-y-2">
          {topScorers.length === 0 ? (
            <p className="text-gray-500 text-center glass p-3 rounded">No data available</p>
          ) : (
            topScorers.map((s, i) => (
              <li key={s.player.id} className="flex justify-between items-center hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                <span>{i + 1}. {s.player.name}</span>
                <span className="font-extrabold text-yellow-600">{s.goals}</span>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gradient-to-r from-blue-500 to-teal-500">
        <h3 className="text-lg font-extrabold text-white bg-gradient-to-r from-blue-900 to-teal-600 p-3 rounded-t-lg -m-6 mb-4">Top Assists</h3>
        <ul className="space-y-2">
          {topAssists.length === 0 ? (
            <p className="text-gray-500 text-center glass p-3 rounded">No data available</p>
          ) : (
            topAssists.map((s, i) => (
              <li key={s.player.id} className="flex justify-between items-center hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                <span>{i + 1}. {s.player.name}</span>
                <span className="font-extrabold text-yellow-600">{s.assists}</span>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gradient-to-r from-blue-500 to-teal-500">
        <h3 className="text-lg font-extrabold text-white bg-gradient-to-r from-blue-900 to-teal-600 p-3 rounded-t-lg -m-6 mb-4">Most Clean Sheets</h3>
        <ul className="space-y-2">
          {topCleanSheets.length === 0 ? (
            <p className="text-gray-500 text-center glass p-3 rounded">No data available</p>
          ) : (
            topCleanSheets.map((s, i) => (
              <li key={s.player.id} className="flex justify-between items-center hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                <span>{i + 1}. {s.player.name}</span>
                <span className="font-extrabold text-yellow-600">{s.cleanSheets}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default PlayerStats;