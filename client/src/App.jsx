// import EventBoard from './components/EventBoard.jsx';
// import LandingPage from './components/pages/LandingPage.jsx';
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage.jsx";
import Dashboard from "./components/layout/DashBoard.jsx";
import EventBoard from "./components/pages/EventBoard.jsx";
import EventForm from "./components/pages/EventForm.jsx";
import AdminEventReview from "./components/pages/AdminEventReview.jsx";
import AdminAssociationManager from "./components/pages/AdminAssociationManager.jsx";

export default function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Guest View (no sidebar) */}
      <Route path="/guest/events" element={<Dashboard />} />

      {/* User Routes */}
      <Route
        path="/user/events"
        element={<Dashboard activePage="EventBoard" />}
      />
      <Route
        path="/user/submit_event"
        element={<Dashboard activePage="EventForm" />}
      />

      {/* Admin Routes */}
      <Route
        path="/admin/admin_event_review"
        element={<Dashboard activePage="adminEventReview" />}
      />
      <Route
        path="/admin/admin_handle_association"
        element={<Dashboard activePage="adminAssociationManager" />}
      />
    </Routes>
  );
}
