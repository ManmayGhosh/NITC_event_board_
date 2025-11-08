import React, { useState } from "react";
import Sidebar from "../ui/Sidebar.jsx";
import Topbar from "../ui/Topbar.jsx";
import { useLocation } from "react-router-dom";
// Your existing UIs
import EventBoard from "../pages/EventBoard.jsx";
import EventForm from "../pages/EventForm.jsx";
import AdminEventReview from "../pages/AdminEventReview.jsx";
import AdminAssociationManager from "../pages/AdminAssociationManager.jsx";

export default function Dashboard({ activePage }) {
  // const [activePage, setActivePage] = useState("eventBoard");
  const location = useLocation();
  const path = location.pathname;
  const isGuest = location.pathname.startsWith("/guest"); // 🟩 detect guest view

  // ✅ Handles which page to render based on sidebar click
  // const renderPage = () => {
  //   switch (activePage) {
  //     case "eventBoard":
  //       return <EventBoard />;
  //     case "eventForm":
  //       return <EventForm />;
  //     case "adminEventReview":
  //       return <AdminEventReview />;
  //     case "adminAssociationManager":
  //       return <AdminAssociationManager />;
  //     default:
  //       return <EventBoard />;
  //   }
  // };

  const renderPage = () => {
    if (path.includes("/submit_event")) return <EventForm />;
    if (path.includes("/admin_event_review")) return <AdminEventReview />;
    if (path.includes("/admin_handle_association"))
      return <AdminAssociationManager />;
    return <EventBoard />; // fallback for /guest/events or /user/events
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {!isGuest && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto p-4">{renderPage()}</main>
      </div>
    </div>
  );
}
