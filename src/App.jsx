import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black antialiased font-sans overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </div>
  );
}

export default App;