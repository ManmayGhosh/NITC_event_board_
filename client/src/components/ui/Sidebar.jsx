import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Define role-based menu options
  const menuItems = {
    admin: [
      { label: "Event View", path: "/user/events" },
      { label: "Admin Handle Event", path: "/admin/admin_event_review" },
      { label: "Admin Handle Association", path: "/admin/admin_handle_association" },
    ],
    association_head: [
      { label: "Event View", path: "/user/events" },
      { label: "Submit Event", path: "/user/submit_event" },
    ],
    guest: [
      { label: "Event View", path: "/guest/events" },
    ],
  };

  // Determine which set of items to show
  const items = menuItems[role] || menuItems.guest;

  // Logout button handler
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="text-center py-4 text-2xl font-bold border-b border-gray-700">
        Dashboard
      </div>

      <nav className="flex flex-col mt-2 flex-grow">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`px-6 py-3 text-left transition ${
              location.pathname === item.path ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* 🔹 Logout button */}
      <div className="border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full px-6 py-3 text-left hover:bg-red-600 bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
