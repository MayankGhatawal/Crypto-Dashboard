// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-9">
      <div className="container mx-auto text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Crypto Dashboard. All rights reserved.
        </p>
        <p className="text-gray-400">
          Developed with ❤️ by <a href="https://github.com/MayankGhatawal" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Mayank Ghatawal</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
