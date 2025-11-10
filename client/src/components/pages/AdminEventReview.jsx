import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalView from "../common/ModalView.jsx";

export default function AdminEventReview() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Track recently denied events (for double confirmation)
  const [pendingDelete, setPendingDelete] = useState(null);

  // 🟢 Fetch events from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((res) => {
        const payload = Array.isArray(res.data) ? res.data : res.data.data;
        setEvents(payload || []);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch events:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🟡 Handle admin actions
  const handleAction = async (id, action) => {
    try {
      if (action === "Denied") {
        const event = events.find((e) => e._id === id);

        // Step 1: If not yet pending deletion → mark as Denied
        if (pendingDelete !== id) {
          await axios.patch(`http://localhost:5000/events/${id}/status`, {
            status: "Denied",
          });

          setEvents((prev) =>
            prev.map((e) =>
              e._id === id ? { ...e, status: "Denied" } : e
            )
          );
          setPendingDelete(id);

          alert(
            "⚠️ Event marked as Denied.\nClick 'Deny' again to permanently delete this event."
          );
          return;
        }

        // Step 2: Confirm permanent deletion
        const confirmDelete = window.confirm(
          "🚨 This will permanently delete the event. Continue?"
        );
        if (!confirmDelete) {
          setPendingDelete(null);
          return;
        }

        await axios.delete(`http://localhost:5000/events/${id}`);
        setEvents((prev) => prev.filter((event) => event._id !== id));
        setSelectedEvent(null);
        setPendingDelete(null);

        alert("🗑️ Event permanently deleted.");
        return;
      }

      // 🟩 For other actions (Approve / Review)
      await axios.patch(`http://localhost:5000/events/${id}/status`, {
        status: action,
      });

      setEvents((prev) =>
        prev.map((event) =>
          event._id === id ? { ...event, status: action } : event
        )
      );

      setSelectedEvent(null);
      setPendingDelete(null);
      console.log(`✅ Event ${id} updated to ${action}`);
    } catch (err) {
      console.error("❌ Action failed:", err);
      alert("Action failed. Check console for details.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-linear-to-br from-gray-50 to-blue-100">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-blue-200 w-1/3 rounded" />
          <div className="h-48 bg-blue-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-blue-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Admin Event Review Panel
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-md bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Event Name</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">Venue</th>
              <th className="py-3 px-4 text-left">Association Head</th>
              <th className="py-3 px-4 text-left">Association Name</th>
              <th className="py-3 px-4 text-center">Action</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr
                key={event._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
                onClick={() => setSelectedEvent(event)}
              >
                <td className="py-3 px-4">{event.name}</td>
                <td className="py-3 px-4">{formatDate(event.date)}</td>
                <td className="py-3 px-4">
                  {event.startTime} - {event.endTime}
                </td>
                <td className="py-3 px-4">{event.venue}</td>
                <td className="py-3 px-4">{event.associationHead}</td>
                <td className="py-3 px-4">{event.associationName}</td>
                <td
                  className="py-3 px-4 text-center space-x-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleAction(event._id, "Approved")}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Allow
                  </button>

                  <button
                    onClick={() => handleAction(event._id, "Denied")}
                    className={`px-3 py-1 rounded text-white ${
                      pendingDelete === event._id
                        ? "bg-red-700 animate-pulse"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {pendingDelete === event._id ? "Confirm Delete" : "Deny"}
                  </button>

                  <button
                    onClick={() => handleAction(event._id, "Review Requested")}
                    className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                  >
                    Review
                  </button>
                </td>
                <td
                  className={`py-3 px-4 text-center font-medium ${
                    event.status === "Approved"
                      ? "text-green-600"
                      : event.status === "Denied"
                      ? "text-red-600"
                      : event.status === "Review Requested"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}
                >
                  {event.status || "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ✅ Event Details Modal */}
        <ModalView
          show={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent?.name || "Event Details"}
        >
          {selectedEvent && (
            <div className="space-y-2">
              <img
                src={
                  selectedEvent.banner ||
                  `https://picsum.photos/seed/${selectedEvent._id}/800/400`
                }
                alt={selectedEvent.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <p><strong>Date:</strong> {formatDate(selectedEvent.date)}</p>
              <p>
                <strong>Time:</strong> {selectedEvent.startTime} -{" "}
                {selectedEvent.endTime}
              </p>
              <p><strong>Venue:</strong> {selectedEvent.venue}</p>
              <p><strong>Association:</strong> {selectedEvent.associationName}</p>
              <p><strong>Head:</strong> {selectedEvent.associationHead}</p>
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              <p><strong>Status:</strong> {selectedEvent.status || "Pending"}</p>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => handleAction(selectedEvent._id, "Approved")}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Allow
                </button>
                <button
                  onClick={() => handleAction(selectedEvent._id, "Denied")}
                  className={`px-4 py-2 rounded text-white ${
                    pendingDelete === selectedEvent._id
                      ? "bg-red-700 animate-pulse"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {pendingDelete === selectedEvent._id
                    ? "Confirm Delete"
                    : "Deny"}
                </button>
                <button
                  onClick={() =>
                    handleAction(selectedEvent._id, "Review Requested")
                  }
                  className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                >
                  Review
                </button>
              </div>
            </div>
          )}
        </ModalView>
      </div>
    </div>
  );
}