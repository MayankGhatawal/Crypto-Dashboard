import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          <Link to="/">Crypto Dashboard</Link>
        </h1>
        <ul className="flex space-x-6">
          <li>
            <Link className="text-gray-300 hover:text-white transition duration-200" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white transition duration-200" to="/slider">
              Order Book
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white transition duration-200" to="/candlestick">
              Candlestick Chart
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white transition duration-200" to="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
