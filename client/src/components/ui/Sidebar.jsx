import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="text-center py-4 text-2xl font-bold border-b border-gray-700">
        Dashboard
      </div>
      <nav className="flex flex-col mt-2">
        <button
          onClick={() => navigate("/user/events")}
          className="px-6 py-3 text-left hover:bg-gray-700 transition"
        >
          Event View
        </button>
        <button
          onClick={() => navigate("/user/submit_event")}
          className="px-6 py-3 text-left hover:bg-gray-700 transition"
        >
          Submit Event
        </button>
        <button
          onClick={() => navigate("/admin/admin_event_review")}
          className="px-6 py-3 text-left hover:bg-gray-700 transition"
        >
          Admin Handle Event
        </button>
        <button
          onClick={() => navigate("/admin/admin_handle_association")}
          className="px-6 py-3 text-left hover:bg-gray-700 transition"
        >
          Admin Handle Association
        </button>
      </nav>
    </aside>
  );
}
