import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Landing/home';
import Dashboard from './Dashboard/dboard';
import Navbar from './components/Navbar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
       
      </Routes>
    </Router>
  );
}

export default App;
