import React, { useState, useEffect } from "react";
import Sidebar from "../ui/Sidebar.jsx";
import Topbar from "../ui/Topbar.jsx";
import { useLocation, useNavigate } from "react-router-dom";

import EventBoard from "../pages/EventBoard.jsx";
import EventForm from "../pages/EventForm.jsx";
import AdminEventReview from "../pages/AdminEventReview.jsx";
import AdminAssociationManager from "../pages/AdminAssociationManager.jsx";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [role, setRole] = useState("guest");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setRole(parsed.role || "guest");
    } else {
      // redirect if not logged in
      navigate("/");
    }
  }, [navigate]);

  const renderPage = () => {
    // restrict access based on role
    if (role === "admin") {
      if (path.includes("/admin_event_review")) return <AdminEventReview />;
      if (path.includes("/admin_handle_association"))
        return <AdminAssociationManager />;
      return <EventBoard />; // event view
    }

    if (role === "association_head") {
      if (path.includes("/submit_event")) return <EventForm />;
      return <EventBoard />;
    }

    // guests see only event board
    return <EventBoard />;
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar only if not guest */}
      {role !== "guest" && <Sidebar role={role} />}

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto p-4">{renderPage()}</main>
      </div>
    </div>
  );
}
