import React, { useState, useEffect } from "react";
import axios from "axios";

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    associationName: "",
    associationHead: "",
    email: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    description: "",
    banner: "",
    registrationLink: "",
  });

  const [loading, setLoading] = useState(false);

  // 🟩 Load user info from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);

      // Only auto-fill if user is association head
      if (user.role === "association_head") {
        setFormData((prev) => ({
          ...prev,
          associationHead: user.name || "",
          email: user.email || "",
        }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      eventName,
      associationName,
      associationHead,
      email,
      startDate,
      endDate,
      startTime,
      endTime,
      venue,
      banner,
    } = formData;

    if (
      !eventName ||
      !associationName ||
      !associationHead ||
      !email ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !venue ||
      !banner
    ) {
      alert("⚠️ Please fill all required fields before submitting.");
      return;
    }

    // Validate email
    if (!email.endsWith("@nitc.ac.in")) {
      alert("⚠️ Please use a valid @nitc.ac.in email address.");
      return;
    }

    // Validate banner URL
    const urlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i;
    if (!urlRegex.test(banner)) {
      alert("⚠️ Please provide a valid image URL ending with .jpg, .png, etc.");
      return;
    }

    try {
      setLoading(true);

      const data = {
        name: eventName,
        associationName,
        associationHead,
        email,
        startDate,
        endDate,
        startTime,
        endTime,
        venue,
        description: formData.description || "",
        banner,
        registrationLink: formData.registrationLink || "",
      };

      const res = await axios.post("http://localhost:5000/events", data);

      console.log("✅ Event saved:", res.data);
      alert("🎉 Event submitted successfully!");

      setFormData({
        eventName: "",
        associationName: "",
        associationHead: res.data.associationHead || "",
        email: res.data.email || "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        venue: "",
        description: "",
        banner: "",
        registrationLink: "",
      });
    } catch (err) {
      console.error("❌ Failed to submit event:", err);
      alert("Failed to submit event. Check console for details.");
    } finally {
      setLoading(false);
    }
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

        {/* Basic Info */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Editable Association Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Association Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="associationName"
            value={formData.associationName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Read-only Head + Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Association Head
          </label>
          <input
            type="text"
            name="associationHead"
            value={formData.associationHead}
            onChange={handleChange}
            readOnly
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email (NITC)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Times */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              End Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Banner URL */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Banner Image URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="banner"
            value={formData.banner}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          {formData.banner && (
            <img
              src={formData.banner}
              alt="Event Banner Preview"
              className="w-full h-48 object-cover rounded-lg mt-3 border"
            />
          )}
        </div>

        {/* Optional Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {loading ? "Submitting..." : "Submit Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;