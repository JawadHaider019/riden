import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import About from './pages/About';
import BookingPage from './pages/BookingPage';


import ProfilePage from './pages/ProfilePage';


import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
