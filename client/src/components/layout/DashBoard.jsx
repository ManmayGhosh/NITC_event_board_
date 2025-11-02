import React, { useState } from "react";
import Sidebar from "../ui/Sidebar.jsx";
import Topbar from "../ui/Topbar.jsx";

// Your existing UIs
import EventBoard from "../pages/EventBoard.jsx";
import EventForm from "../pages/EventForm.jsx";
import AdminEventReview from "../pages/AdminEventReview.jsx";
import AdminAssociationManager from "../pages/AdminAssociationManager.jsx";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("eventBoard");

  // ✅ Handles which page to render based on sidebar click
  const renderPage = () => {
    switch (activePage) {
      case "eventBoard":
        return <EventBoard />;
      case "eventForm":
        return <EventForm />;
      case "adminEventReview":
        return <AdminEventReview />;
      case "adminAssociationManager":
        return <AdminAssociationManager />;
      default:
        return <EventBoard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* ✅ Sidebar now receives setActivePage to switch between pages */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* ✅ Main Section - Topbar stays fixed, content changes */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto p-4">{renderPage()}</main>
      </div>
    </div>
  );
}

