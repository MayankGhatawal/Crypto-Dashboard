import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, TimeScale, LinearScale, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

ChartJS.register(TimeScale, LinearScale, CandlestickController, CandlestickElement, Tooltip, Legend);

const SYMBOLS = ['ethusdt', 'bnbusdt', 'dotusdt'];
const INTERVALS = ['1m', '3m', '5m'];

const CandlestickChart = () => {
    const socketRef = useRef(null);
  const [symbol, setSymbol] = useState(SYMBOLS[0]);
  const [interval, setInterval] = useState(INTERVALS[0]);
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {
      socketRef.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`);

      socketRef.current.onopen = () => console.log('WebSocket connection established.');

      socketRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        
        if (message.e === "kline" && message.k.x) {  // Check if event is kline and kline is closed
          const kline = message.k;
          const newCandle = {
            t: new Date(kline.t),  // Start time of the kline
            o: parseFloat(kline.o), // Open price
            h: parseFloat(kline.h), // High price
            l: parseFloat(kline.l), // Low price
            c: parseFloat(kline.c), // Close price
          };
      
          setChartData((prevData) => {
            const updatedData = [...prevData, newCandle];
            return updatedData.length > 60 ? updatedData.slice(updatedData.length - 60) : updatedData;
          });
        }
      };

      socketRef.current.onerror = (error) => console.error('WebSocket error observed:', error);

      socketRef.current.onclose = (event) => {
        console.log('WebSocket is closed now.', event);
        setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket();

    return () => {
      socketRef.current && socketRef.current.close();
    };
  }, [symbol, interval]);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartData.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new ChartJS(ctx, {
        type: 'candlestick',
        data: {
          datasets: [
            {
              label: `${symbol.toUpperCase()} Candlestick`,
              data: chartData,
              backgroundColor: 'rgba(0, 255, 0, 0.5)',
              borderColor: 'rgba(0, 255, 0, 1)',
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: { unit: 'minute' },
              title: { display: true, text: 'Time' },
              ticks: { color: 'white' },
            },
            y: {
              title: { display: true, text: 'Price' },
              ticks: { color: 'white' },
            },
          },
          responsive: true,
          plugins: {
            legend: { display: true, position: 'top', labels: { color: 'white' } },
            tooltip: { callbacks: { labelColor: () => ({ borderColor: 'white', backgroundColor: 'white' }) } },
          },
        },
      });
    }
  }, [chartData, symbol]);

  const handleSymbolChange = (event) => setSymbol(event.target.value);
  const handleIntervalChange = (event) => setInterval(event.target.value);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 text-white ">
      <div className="flex mb-4">
        <select
          className="border border-gray-700 rounded-md p-2 mr-2 bg-gray-800 text-white"
          onChange={handleSymbolChange}
          value={symbol}
        >
          {SYMBOLS.map((sym) => (
            <option key={sym} value={sym}>
              {sym.toUpperCase()}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-700 rounded-md p-2 bg-gray-800 text-white"
          onChange={handleIntervalChange}
          value={interval}
        >
          {INTERVALS.map((int) => (
            <option key={int} value={int}>
              {int}
            </option>
          ))}
        </select>
      </div>
      <canvas id="candlestickChart" ref={chartRef} width="800" height="400"></canvas>
    </div>
  );
};

export default CandlestickChart;
