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
  const [missingFields, setMissingFields] = useState([]);

  // 🟩 Load user info if association head
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
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

  // 🧠 Validate required fields
  const validateFields = () => {
    const requiredFields = {
      eventName: "Event Name",
      associationName: "Association Name",
      associationHead: "Association Head",
      email: "Email (NITC)",
      startDate: "Start Date",
      endDate: "End Date",
      startTime: "Start Time",
      endTime: "End Time",
      venue: "Venue",
      banner: "Banner URL",
    };

    const missing = Object.keys(requiredFields).filter(
      (field) => !formData[field] || formData[field].trim() === ""
    );

    setMissingFields(missing.map((f) => requiredFields[f]));
    return missing;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missing = validateFields();

    if (missing.length > 0) {
      alert(
        "⚠️ Please fill the following required fields:\n\n- " +
          missing.join("\n- ")
      );
      return;
    }

    if (!formData.email.endsWith("@nitc.ac.in")) {
      alert("⚠️ Please use a valid @nitc.ac.in email address.");
      return;
    }

    const urlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i;
    if (!urlRegex.test(formData.banner)) {
      alert("⚠️ Please provide a valid image URL ending with .jpg, .png, etc.");
      return;
    }

    try {
      setLoading(true);

      const data = {
        name: formData.eventName,
        associationName: formData.associationName,
        associationHead: formData.associationHead,
        email: formData.email,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        venue: formData.venue,
        description: formData.description || "",
        banner: formData.banner,
        registrationLink: formData.registrationLink || "",
      };

      const res = await axios.post("http://localhost:5000/events", data);
      alert("🎉 Event submitted successfully!");
      console.log("✅ Event saved:", res.data);

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
      setMissingFields([]);
    } catch (err) {
      console.error("❌ Failed to submit event:", err);
      alert("Failed to submit event. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // 🎨 Field styling
  const inputClass = (field) =>
    `w-full p-2 border rounded-lg focus:ring-2 ${
      missingFields.includes(field)
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-indigo-500"
    }`;

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
            className={inputClass("Event Name")}
          />
        </div>

        {/* Association Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Association Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="associationName"
            value={formData.associationName}
            onChange={handleChange}
            className={inputClass("Association Name")}
          />
        </div>

        {/* Association Head */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Association Head
          </label>
          <input
            type="text"
            name="associationHead"
            value={formData.associationHead}
            readOnly
            className={inputClass("Association Head") + " bg-gray-100"}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email (NITC)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className={inputClass("Email (NITC)") + " bg-gray-100"}
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
              className={inputClass("Start Date")}
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
              className={inputClass("End Date")}
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
              className={inputClass("Start Time")}
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
              className={inputClass("End Time")}
            />
          </div>
        </div>

        {/* ✅ Venue */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Venue <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Enter event venue"
            className={inputClass("Venue")}
          />
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
            className={inputClass("Banner URL")}
          />
          {formData.banner && (
            <img
              src={formData.banner}
              alt="Event Banner Preview"
              className="w-full h-48 object-cover rounded-lg mt-3 border"
            />
          )}
        </div>

        {/* Description */}
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

        {/* Missing Field Display */}
        {missingFields.length > 0 && (
          <div className="mb-4 bg-red-50 border border-red-300 rounded-lg p-3 text-sm text-red-600">
            <strong>Missing Required Fields:</strong>
            <ul className="list-disc ml-5 mt-1">
              {missingFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </div>
        )}

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