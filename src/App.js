import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Navbar from './components/Navbar';
import ImageCapturer from './components/ImageCapturer';

function App() {
  const [mode, setMode] = useState('light'); // whether dark mode is enabled or not

  const toggleMode = () => {
    if (mode === 'dark') {
      setMode('light');
      document.body.style.color = 'black';
    } else {
      setMode('dark');
      document.body.style.backgroundColor = '#2f2f2f';
      document.body.style.color = 'white';
    }
  };

  return (
    <div>
      <Router>
        <Navbar title="Animal Detection App" mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route path="/" element={<ImageCapturer mode={mode}/>} />
          <Route path="/about" element={<About mode={mode}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
