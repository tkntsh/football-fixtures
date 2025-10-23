import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-600 text-red-800 p-6 rounded-lg shadow-md glass m-6 animate-fade-in">
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;