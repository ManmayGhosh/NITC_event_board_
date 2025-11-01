import React, { useState } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    associationHead: "",
    email: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    poster: null,
    registrationLink: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "poster") {
      const file = files[0];
      if (!file) return;

      const validTypes = ["image/png", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        alert("❌ Only PNG and JPG files are allowed!");
        e.target.value = "";
        return;
      }
      setFormData((prev) => ({ ...prev, poster: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { eventName, associationHead, email, date, time, venue } = formData;

    // ✅ Mandatory fields validation
    if (!eventName || !associationHead || !email || !date || !time || !venue) {
      alert("⚠️ Please fill all mandatory fields (Event Name, Association Head, Email, Date, Time, Venue).");
      return;
    }

    // ✅ Validate email format + domain
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email.endsWith("@nitc.ac.in")) {
      alert("⚠️ Please enter a valid @nitc.ac.in email address.");
      return;
    }

    console.log("✅ Submitted Event:", formData);
    alert("Event submitted successfully! (Check console for details)");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
          Event Submission Form
        </h2>

        {/* Event Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            maxLength="50"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-sm text-gray-500 text-right">
            {formData.eventName.length}/50
          </p>
        </div>

        {/* Association Head */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Association Head <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="associationHead"
            value={formData.associationHead}
            onChange={handleChange}
            maxLength="50"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-sm text-gray-500 text-right">
            {formData.associationHead.length}/50
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email (NITC) <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@nitc.ac.in"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Date & Time */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">
              Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Venue */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Venue <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            maxLength="50"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-sm text-gray-500 text-right">
            {formData.venue.length}/50
          </p>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength="250"
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-sm text-gray-500 text-right">
            {formData.description.length}/250
          </p>
        </div>

        {/* Poster Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Poster (PNG/JPG)
          </label>
          <input
            type="file"
            name="poster"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Registration Link */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Google Registration Link
          </label>
          <input
            type="url"
            name="registrationLink"
            value={formData.registrationLink}
            onChange={handleChange}
            placeholder="https://forms.gle/..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Submit Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
