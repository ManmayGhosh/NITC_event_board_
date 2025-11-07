import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalView from "../common/ModalView";

export default function EventBoard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    let mounted = true;
    axios.get("http://localhost:5000/events")
    .then((res) => {
      console.log("📦 Event data from backend:", res.data);
      const payload = Array.isArray(res.data) ? res.data : res.data.data;
      setEvents(payload || []);
    })
    .catch((err) => {
      console.error("❌ Failed to fetch events:", err);
      if (err.response) console.log("Server responded with:", err.response.data);
      if (err.request) console.log("No response received:", err.request);
    })
    .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);
  

    // 🔹 Helper to format backend ISO date (e.g. 2025-11-12T00:00:00.000Z) to readable form
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
      <div className="p-6 min-h-screen bg-linear-to-br from-violet-50 via-pink-50 to-rose-100">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-pink-200 w-1/3 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="h-48 bg-pink-200 rounded" />
            <div className="h-48 bg-pink-200 rounded" />
            <div className="h-48 bg-pink-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  let filtered = events.filter((e) =>
    (e.name || "").toLowerCase().includes(search.toLowerCase())
  );

  filtered.sort((a, b) => {
    if (sortBy === "name_asc") return a.name.localeCompare(b.name);
    if (sortBy === "name_desc") return b.name.localeCompare(a.name);
    if (sortBy === "date_asc") return new Date(a.date) - new Date(b.date);
    if (sortBy === "date_desc") return new Date(b.date) - new Date(a.date);
    return 0;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-pink-100 to-rose-200 text-gray-800 p-6">
      <header className="flex justify-between items-center mb-8 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md border-b border-pink-200">
        <h1 className="text-3xl font-bold text-pink-700 drop-shadow-sm">
          Upcoming Events
        </h1>

        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded border border-pink-300 bg-white/70"
          >
            <option value="name_asc">Name ↑</option>
            <option value="name_desc">Name ↓</option>
            <option value="date_asc">Date ↑</option>
            <option value="date_desc">Date ↓</option>
          </select>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-1">
        {filtered.map((event) => (
          <article
            key={event._id || event.name}
            className="bg-white/80 backdrop-blur-sm border border-pink-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition cursor-pointer"
            onClick={() => setSelectedEvent(event)}
          >
            <img
              src={event.banner || `https://picsum.photos/seed/${event._id}/800/400`}
              alt={event.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold text-pink-700 mt-3">{event.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              📅 {formatDate(event.date)} • {event.time} <br /> 📍 {event.venue}
            </p>
            <p className="text-sm mt-2">Head: {event.associationHead}</p>
          </article>
        ))}
      </div>

      {/* Popup Modal */}
      <ModalView
        show={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.name}
      >
        {selectedEvent && (
          <div className="space-y-2">
            <img
              src={selectedEvent.banner || `https://picsum.photos/seed/${selectedEvent._id}/800/400`}
              alt={selectedEvent.name}
              className="rounded w-full h-48 object-cover mb-4"
            />
            <p><strong>Date:</strong> {formatDate(selectedEvent.date)}</p>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Venue:</strong> {selectedEvent.venue}</p>
            <p><strong>Head:</strong> {selectedEvent.associationHead}</p>
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
          </div>
        )}
      </ModalView>
    </div>
  );
}
