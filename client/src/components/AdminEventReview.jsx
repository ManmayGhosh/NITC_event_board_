import React, { useState } from "react";

export default function AdminEventReview() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tech Fest 2025",
      date: "2025-11-20",
      time: "10:00 AM",
      venue: "Auditorium",
      associationHead: "Dr. Rao",
      associationName: "Tech Club",
      status: "Pending",
    },
    {
      id: 2,
      name: "Cultural Night",
      date: "2025-12-01",
      time: "7:00 PM",
      venue: "Open Ground",
      associationHead: "Prof. Nair",
      associationName: "Cultural Committee",
      status: "Pending",
    },
  ]);

  const handleAction = (id, action) => {
    const updated = events.map((event) =>
      event.id === id ? { ...event, status: action } : event
    );
    setEvents(updated);
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
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">Venue</th>
              <th className="py-3 px-4 text-left">Association Head</th>
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
              >
                <td className="py-3 px-4">{event.name}</td>
                <td className="py-3 px-4">{event.date}</td>
                <td className="py-3 px-4">{event.time}</td>
                <td className="py-3 px-4">{event.venue}</td>
                <td className="py-3 px-4">{event.associationHead}</td>
                <td className="py-3 px-4">{event.associationName}</td> {/* ✅ Added */}
                <td className="py-3 px-4 text-center space-x-2">
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
      </div>
    </div>
  );
}
