import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

// Your existing UIs
import EventBoard from "../pages/EventBoard";
import EventForm from "../pages/EventForm";
import AdminEventReview from "../pages/AdminEventReview";
import AdminAssociationManager from "../pages/AdminAssociationManager";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("eventBoard");

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
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto">{renderPage()}</main>
      </div>
    </div>
  );
}
