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
  const [isAdmin, setIsAdmin] = useState(false);

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

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === "admin") setIsAdmin(true);
    }
  }, []);

  // ✅ Download log file
  const handleDownloadLogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/download-logs", {
        method: "GET",
      });

      if (!response.ok) {
        alert("⚠️ No logs found or error downloading logs.");
        return;
      }

      // 🧩 Create a blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "admin_actions.log";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      console.log("✅ Log file downloaded successfully.");
    } catch (error) {
      console.error("❌ Error downloading logs:", error);
      alert("Failed to download logs. Check console for details.");
    }
  };

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

      {/* 🟦 Admin-only "Download Logs" button */}
      {isAdmin && (
          <div className="flex justify-end p-4">
            <button
              onClick={handleDownloadLogs}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              ⬇️ Download Logs
            </button>
          </div>
        )}
        
        <main className="flex-1 overflow-auto p-4">{renderPage()}</main>
      </div>
    </div>
  );
}
