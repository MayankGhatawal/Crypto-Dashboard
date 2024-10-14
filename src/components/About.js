// About.js
import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-6">About This Application</h1>
      <p className="text-lg text-gray-300 mb-8 max-w-3xl text-center">
        This application provides real-time candlestick charts for cryptocurrencies using Binance's WebSocket API. You can select various symbols and intervals to track live price updates in a visually appealing and easy-to-use interface.
      </p>

      <div className="flex justify-center space-x-6">
        <a
          href="https://www.binance.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Learn More About Binance
        </a>
        <a
          href="/"
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default About;
