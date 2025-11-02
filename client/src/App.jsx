// import EventBoard from './components/EventBoard.jsx';
// import LandingPage from './components/pages/LandingPage.jsx';
import Dashboard from "./components/layout/DashBoard.jsx";
import React from "react";
import {Routes , Route} from "react-router-dom";
import LandingPage from "./components/pages/LandingPage.jsx";
import EventBoard from "./components/pages/EventBoard.jsx";
export default function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<LandingPage />} />

      {/* Dashboard after login */}
      <Route path="/events" element={<Dashboard />} />

      {/* 🟩 New route for Guest View (EventBoard only) */}
      {/* <Route path="/guest" element={<EventBoard />} /> */}
    </Routes>
  );
}