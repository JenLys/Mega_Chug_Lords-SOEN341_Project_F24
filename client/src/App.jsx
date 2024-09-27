import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import About from './pages/About';
import HowToUse from './pages/HowToUse';
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-to-use" element={<HowToUse />} />
        </Routes>
      </main>
    </div>
    
  );
}

export default App;
