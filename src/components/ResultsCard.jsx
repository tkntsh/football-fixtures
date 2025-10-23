import React from 'react';

function ResultsCard({ match }) {
  const matchDate = new Date(match.utcDate);
  const formattedDate = matchDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const formattedTime = matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const homeScore = match.score.fullTime?.home ?? '?';
  const awayScore = match.score.fullTime?.away ?? '?';

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in border border-gradient-to-r from-blue-500 to-teal-500">
      <div className="flex items-center space-x-4 w-full sm:w-1/4 mb-4 sm:mb-0">
        <img
          src={match.homeTeam.crest || 'https://via.placeholder.com/40'}
          alt="Home"
          className="w-12 h-12 object-contain transform hover:scale-110 transition-transform duration-200"
        />
        <span className="font-semibold text-lg text-gray-800">{match.homeTeam.name}</span>
      </div>
      <div className="text-center w-full sm:w-1/2">
        <p className="text-sm text-gray-400 uppercase tracking-wide">{formattedDate}</p>
        <div className="flex justify-center items-center space-x-2">
          <p className="text-3xl font-extrabold text-yellow-400">{homeScore}</p>
          <span className="text-xl font-bold text-gray-400">-</span>
          <p className="text-3xl font-extrabold text-yellow-400">{awayScore}</p>
        </div>
        <p className="text-lg font-semibold text-gray-700">{formattedTime}</p>
      </div>
      <div className="flex items-center space-x-4 w-full sm:w-1/4 justify-end">
        <span className="font-semibold text-lg text-gray-800">{match.awayTeam.name}</span>
        <img
          src={match.awayTeam.crest || 'https://via.placeholder.com/40'}
          alt="Away"
          className="w-12 h-12 object-contain transform hover:scale-110 transition-transform duration-200"
        />
      </div>
    </div>
  );
}

export default ResultsCard;