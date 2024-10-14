import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CandlestickChart from './components/CandlestickChart';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import FullPageSlider from './components/Slider';
import OrderBook from './components/OrderBook';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candlestick" element={<CandlestickChart />} />
          <Route path="/about" element={<About />} />
          <Route path="/slider" element={<OrderBook />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
