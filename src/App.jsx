import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TourProvider } from './contexts/TourContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import TourPlanner from './pages/TourPlanner';
import HotelBooking from './pages/HotelBooking';
import Checkout from './pages/Checkout';

function App() {
  return (
    <TourProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tour-planner" element={<TourPlanner />} />
              <Route path="/hotels" element={<HotelBooking />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TourProvider>
  );
}

export default App;