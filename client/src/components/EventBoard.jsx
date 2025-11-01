import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EventBoard() {
  const [events, setEvents] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name_asc"); // supports name/date asc/desc

  useEffect(() => {
    let mounted = true;
    axios.get("http://localhost:5000/api/events")
      .then((res) => { if (mounted) setEvents(res.data); })
      .catch((err) => { console.error(err); if (mounted) setEvents([]); });
    return () => (mounted = false);
  }, []);

  if (events === null) {
    // loading skeleton
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 w-1/3 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-48 bg-gray-300 rounded"></div>
            <div className="h-48 bg-gray-300 rounded"></div>
            <div className="h-48 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // filter
  let filtered = events.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  // sort logic
  filtered.sort((a,b) => {
    if (sortBy === "name_asc") return a.name.localeCompare(b.name);
    if (sortBy === "name_desc") return b.name.localeCompare(a.name);
    if (sortBy === "date_asc") return new Date(a.date) - new Date(b.date);
    if (sortBy === "date_desc") return new Date(b.date) - new Date(a.date);
    return 0;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex gap-4 mb-6">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Search events by name..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <select className="p-2 border rounded" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
          <option value="name_asc">Name ↑</option>
          <option value="name_desc">Name ↓</option>
          <option value="date_asc">Date ↑</option>
          <option value="date_desc">Date ↓</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map(event => (
          <article key={event._id} className="bg-white rounded shadow p-3">
            <img src={event.banner} alt={event.name} className="w-full h-40 object-cover rounded" />
            <h2 className="mt-2 font-semibold">{event.name}</h2>
            <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
            <p className="text-sm text-gray-600">{event.venue}</p>
            <p className="text-sm mt-2">Head: {event.associationHead}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
