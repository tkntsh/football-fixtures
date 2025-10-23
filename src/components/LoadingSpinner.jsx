import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-pulse-grow"></div>
      <p className="ml-4 text-lg text-white glass p-2 rounded font-medium">Loading Premier League data...</p>
    </div>
  );
}

export default LoadingSpinner;