import React, { useState } from "react";
import ModalView from "../common/ModalView.jsx"; // ✅ make sure this file exists

export default function AdminEventReview() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tech Fest 2025",
      startDate: "2025-11-20",
      startTime: "10:00 AM",
      endDate: "2025-11-22",
      endTime: "1:00 PM",
      venue: "Auditorium",
      associationHead: "Dr. Rao",
      email: "drao@nitc.ac.in",
      associationName: "Tech Club",
      description: "A showcase of technology innovations and workshops.",
      status: "Pending",
    },
    {
      id: 2,
      name: "Cultural Night",
      startDate: "2025-12-01",
      startTime: "7:00 PM",
      endDate: "2025-12-02",
      endTime: "10:00 AM",
      venue: "Open Ground",
      associationHead: "Prof. Nair",
      email: "pnair@nitc.ac.in",
      associationName: "Cultural Committee",
      description: "An evening filled with music, dance, and performances.", 
      status: "Pending",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null); // 🟢 Added — for modal open/close control

  const handleAction = (id, action) => {
    const updated = events.map((event) =>
      event.id === id ? { ...event, status: action } : event
    );
    setEvents(updated);
    setSelectedEvent(null); // 🟢 Added — close modal after action
  };

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
              <th className="py-3 px-4 text-left">Start Date</th>
              {/* <th className="py-3 px-4 text-left">Start Time</th> */}
              <th className="py-3 px-4 text-left">End Date</th>
              {/* <th className="py-3 px-4 text-left">End Time</th> */}
              <th className="py-3 px-4 text-left">Venue</th>
              {/* <th className="py-3 px-4 text-left">Association Head</th> */}
              <th className="py-3 px-4 text-left">Association Name</th> {/* ✅ Added */}
              <th className="py-3 px-4 text-center">Action</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
                onClick={() => setSelectedEvent(event)} // 🟢 Added — open modal when row clicked
              >
                <td className="py-3 px-4">{event.name}</td>
                <td className="py-3 px-4">{event.startDate}</td>
                {/* <td className="py-3 px-4">{event.startTime}</td> */}
                <td className="py-3 px-4">{event.endDate || "-"}</td>
                {/* <td className="py-3 px-4">{event.endTime || "-"}</td> */}
                <td className="py-3 px-4">{event.venue}</td>
                {/* <td className="py-3 px-4">{event.associationHead}</td> */}
                <td className="py-3 px-4">{event.associationName}</td> {/* ✅ Added */}
                <td 
                  className="py-3 px-4 text-center space-x-2"
                  onClick={(e) => e.stopPropagation()} // Prevent row click when clicking buttons
                >
                  <button
                    onClick={() => handleAction(event.id, "Approved")}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Allow
                  </button>
                  <button
                    onClick={() => handleAction(event.id, "Denied")}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Deny
                  </button>
                  <button
                    onClick={() => handleAction(event.id, "Review Requested")}
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
                  {event.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* ✅ Popup Modal */}
      <ModalView
        show={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.name || "Event Details"}
      >
        {selectedEvent && (
          <div className="space-y-2">
            <img
              src={selectedEvent.banner}
              alt={selectedEvent.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
           <p><strong>Start Date:</strong> {selectedEvent.startDate}</p>
            <p><strong>Start Time:</strong> {selectedEvent.startTime}</p>
            <p><strong>End Date:</strong> {selectedEvent.endDate || "-"}</p>
            <p><strong>End Time:</strong> {selectedEvent.endTime || "-"}</p>
            <p><strong>Venue:</strong> {selectedEvent.venue}</p>
            <p><strong>Association:</strong> {selectedEvent.associationName}</p>
            <p><strong>Email:</strong> {selectedEvent.email}</p>
            <p><strong>Head:</strong> {selectedEvent.associationHead}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <p>
              <strong>Registration Link:</strong>{" "}
              <a
                href={selectedEvent.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {selectedEvent.registrationLink}
              </a>
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  selectedEvent.status === "Approved"
                    ? "text-green-600"
                    : selectedEvent.status === "Denied"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {selectedEvent.status}
              </span>
            </p>
          </div>
        )}
      </ModalView>
      </div>
      
    </div>
  );
}
