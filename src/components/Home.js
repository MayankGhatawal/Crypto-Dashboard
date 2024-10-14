// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Crypto Dashboard</h1>
      <p className="text-lg mb-10">Real-time Cryptocurrency Data Visualization</p>
      
      <div className="flex space-x-6">
        <Link to="/candlestick">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300">
            View Candlestick Chart
          </button>
        </Link>
        <Link to="/slider">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300">
            Order Book
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
