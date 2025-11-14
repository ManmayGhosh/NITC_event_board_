import React, { useState } from "react";

export default function AdminAssociationManager() {
  const [heads, setHeads] = useState([
    {
      id: 1,
      name: "Dr. Rao",
      email: "rao@nitc.ac.in",
      collegeId: "NITC001",
      associationName: "Tech Society",
      timelineStart: "2024-06-01",
      timelineEnd: "2025-05-31",
      contact: "9876543210",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeId: "",
    associationName: "",
    timelineStart: "",
    timelineEnd: "",
    contact: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, collegeId, associationName, timelineStart, timelineEnd, contact } = formData;

    if (!name || !email || !collegeId || !associationName || !timelineStart || !timelineEnd || !contact) {
      alert("⚠️ All fields are mandatory!");
      return false;
    }

    if (name.length > 50 || associationName.length > 50) {
      alert("⚠️ Name and Association Name must be under 50 characters.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !email.endsWith("@nitc.ac.in")) {
      alert("⚠️ Please enter a valid @nitc.ac.in email address.");
      return false;
    }

    if (!/^[A-Za-z0-9]{1,10}$/.test(collegeId)) {
      alert("⚠️ College ID must be alphanumeric and up to 10 characters.");
      return false;
    }

    if (!/^\d{10}$/.test(contact)) {
      alert("⚠️ Contact must be a valid 10-digit number.");
      return false;
    }

    if (new Date(timelineStart) > new Date(timelineEnd)) {
      alert("⚠️ Start date cannot be after end date.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editId) {
      setHeads((prev) =>
        prev.map((h) => (h.id === editId ? { ...formData, id: editId } : h))
      );
      setEditId(null);
    } else {
      setHeads((prev) => [...prev, { ...formData, id: Date.now() }]);
    }

    setFormData({
      name: "",
      email: "",
      collegeId: "",
      associationName: "",
      timelineStart: "",
      timelineEnd: "",
      contact: "",
    });
  };

  const handleEdit = (id) => {
    const head = heads.find((h) => h.id === id);
    setFormData(head);
    setEditId(id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setHeads((prev) => prev.filter((h) => h.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        Admin — Manage Association Heads
      </h1>

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 mb-8 max-w-3xl mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Association Head" : "Add Association Head"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength="50"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Email (NITC) <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@nitc.ac.in"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              College ID <span className="text-red-500">*</span>
            </label>
            <input
              name="collegeId"
              value={formData.collegeId}
              onChange={handleChange}
              maxLength="10"
              placeholder="e.g. NITC123"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Association Name <span className="text-red-500">*</span>
            </label>
            <input
              name="associationName"
              value={formData.associationName}
              onChange={handleChange}
              maxLength="50"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Timeline (From) <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="timelineStart"
              value={formData.timelineStart}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Timeline (To) <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="timelineEnd"
              value={formData.timelineEnd}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1 text-gray-700">
              Contact Info <span className="text-red-500">*</span>
            </label>
            <input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="10-digit number"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg w-full font-semibold transition"
        >
          {editId ? "Update" : "Add"} Association Head
        </button>
      </form>

      {/* Existing Association Heads */}
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Current Association Heads
        </h2>
        {heads.length === 0 ? (
          <p className="text-gray-500">No association heads added yet.</p>
        ) : (
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Email</th>
                <th className="py-2 px-3 text-left">College ID</th>
                <th className="py-2 px-3 text-left">Association</th>
                <th className="py-2 px-3 text-center">Timeline</th>
                <th className="py-2 px-3 text-center">Contact</th>
                <th className="py-2 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {heads.map((h) => (
                <tr
                  key={h.id}
                  className="border-b hover:bg-gray-50 transition text-gray-700"
                >
                  <td className="py-2 px-3">{h.name}</td>
                  <td className="py-2 px-3">{h.email}</td>
                  <td className="py-2 px-3">{h.collegeId}</td>
                  <td className="py-2 px-3">{h.associationName}</td>
                  <td className="py-2 px-3 text-center">
                    {h.timelineStart} → {h.timelineEnd}
                  </td>
                  <td className="py-2 px-3 text-center">{h.contact}</td>
                  <td className="py-2 px-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(h.id)}
                      className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(h.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
