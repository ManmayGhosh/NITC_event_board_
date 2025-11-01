import { useEffect, useState } from "react";
import axios from "axios";

function EventBoard() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events
    .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search events..."
          className="border p-2 rounded w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="asc">Sort: Name ↑</option>
          <option value="desc">Sort: Name ↓</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md"
          >
            <img
              src={event.banner}
              alt={event.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{event.name}</h2>
            <p className="text-sm text-gray-600">{event.date}</p>
            <p className="text-sm text-gray-600">{event.venue}</p>
            <p className="text-sm text-gray-700 mt-2">
              Association Head: {event.associationHead}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventBoard;
