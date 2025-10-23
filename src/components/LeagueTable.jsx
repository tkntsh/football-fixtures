import React from 'react';

function LeagueTable({ standings }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <h2 className="p-6 bg-gradient-to-r from-blue-900 to-teal-600 text-white text-xl font-extrabold">League Table</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-4 text-left font-semibold">Pos</th>
            <th className="p-4 text-left font-semibold">Team</th>
            <th className="p-4 text-center font-semibold">P</th>
            <th className="p-4 text-center font-semibold">W</th>
            <th className="p-4 text-center font-semibold">D</th>
            <th className="p-4 text-center font-semibold">L</th>
            <th className="p-4 text-center font-semibold">GF</th>
            <th className="p-4 text-center font-semibold">GA</th>
            <th className="p-4 text-center font-semibold">GD</th>
            <th className="p-4 text-center font-semibold">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, index) => (
            <tr key={team.team.id} className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-yellow-50 transition-colors duration-200`}>
              <td className="p-4 font-medium">{index + 1}</td>
              <td className="p-4 flex items-center">
                <img src={team.team.crest} alt={team.team.name} className="w-8 h-8 mr-2 transform hover:scale-110 transition-transform duration-200" />
                <span className="font-semibold">{team.team.name}</span>
              </td>
              <td className="p-4 text-center">{team.playedGames}</td>
              <td className="p-4 text-center">{team.won}</td>
              <td className="p-4 text-center">{team.draw}</td>
              <td className="p-4 text-center">{team.lost}</td>
              <td className="p-4 text-center">{team.goalsFor}</td>
              <td className="p-4 text-center">{team.goalsAgainst}</td>
              <td className="p-4 text-center">{team.goalDifference}</td>
              <td className="p-4 text-center font-extrabold text-yellow-600">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeagueTable;