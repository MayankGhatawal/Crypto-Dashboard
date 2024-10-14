import React, { useEffect, useState } from 'react';
import CandlestickChart from './CandlestickChart';

const SYMBOLS = ['ETHUSDT', 'BNBBTC', 'DOTUSDT'];

const OrderBook = () => {
  const [orderBookData, setOrderBookData] = useState({ bids: [], asks: [] });
  const [selectedSymbol, setSelectedSymbol] = useState(SYMBOLS[0]);

  const fetchOrderBookData = async (symbol) => {
    try {
      const response = await fetch(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=1000`);
      const data = await response.json();
      setOrderBookData({ bids: data.bids, asks: data.asks });
    } catch (error) {
      console.error('Error fetching order book data:', error);
    }
  };

  useEffect(() => {
    fetchOrderBookData(selectedSymbol);
  });

  const handleSymbolChange = (event) => {
    setSelectedSymbol(event.target.value);
    fetchOrderBookData(event.target.value);
  };

  return(
    <div className=" mx-auto p-14 bg-gray-900 text-white">
    <h2 className="text-2xl font-bold mb-4 text-center">Order Book</h2>
    <div className="mb-4">
      <select 
        value={selectedSymbol} 
        onChange={handleSymbolChange} 
        className="border border-gray-700 rounded-md p-2 w-full bg-gray-800 text-white"
      >
        {SYMBOLS.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Bids</h3>
        <ul className="max-h-60 overflow-y-auto">
          {orderBookData.bids.map(([price, qty], index) => (
            <li key={index} className="flex justify-between items-center border-b border-gray-700 py-2">
              <span className="text-green-400">Price: {parseFloat(price).toFixed(2)}</span>
              <span className="text-gray-300">Qty: {parseFloat(qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Asks</h3>
        <ul className="max-h-60 overflow-y-auto">
          {orderBookData.asks.map(([price, qty], index) => (
            <li key={index} className="flex justify-between items-center border-b border-gray-700 py-2">
              <span className="text-red-400">Price: {parseFloat(price).toFixed(2)}</span>
              <span className="text-gray-300">Qty: {parseFloat(qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    {/* <CandlestickChart /> */}
    </div>
  </div>
  );
};

export default OrderBook;
