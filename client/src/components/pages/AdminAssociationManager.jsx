import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminAssociationManager() {
  const [heads, setHeads] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    collegeId: "",
    associationName: "",
    contactNumber: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data on mount
  useEffect(() => {
    fetchHeads();
  }, []);

  const fetchHeads = async () => {
    try {
      const res = await axios.get("http://localhost:5000/heads");
      setHeads(res.data);
      setLoading(false);
    } catch (err) {
      console.error("❌ Failed to fetch association heads:", err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { id, name, email, collegeId, associationName, contactNumber } =
      formData;

    if (!id || !name || !email || !collegeId || !associationName || !contactNumber) {
      alert("⚠️ All fields are mandatory!");
      return false;
    }

    if (!email.endsWith("@nitc.ac.in")) {
      alert("⚠️ Email must end with @nitc.ac.in");
      return false;
    }

    if (!/^[0-9]{10}$/.test(contactNumber)) {
      alert("⚠️ Contact number must be 10 digits.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editId) {
        // ✅ Update existing record
        await axios.patch(`http://localhost:5000/heads/${editId}`, formData);
        alert("✅ Association head updated successfully!");
      } else {
        // ✅ Add new record
        await axios.post("http://localhost:5000/heads", formData);
        alert("✅ Association head added successfully!");
      }
      setFormData({
        id: "",
        name: "",
        email: "",
        collegeId: "",
        associationName: "",
        contactNumber: "",
      });
      setEditId(null);
      fetchHeads(); // refresh list
    } catch (err) {
      console.error("❌ Error saving association head:", err);
      alert("Failed to save association head. Check console for details.");
    }
  };

  const handleEdit = (id) => {
    const head = heads.find((h) => h.id === Number(id));
    if (!head) return;
    setFormData({
      id: head.id,
      name: head.name,
      email: head.email,
      collegeId: head.collegeId,
      associationName: head.associationName,
      contactNumber: head.contactNumber,
    });
    setEditId(id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(`http://localhost:5000/heads/${id}`);
      alert("🗑️ Association head deleted successfully!");
      fetchHeads();
    } catch (err) {
      console.error("❌ Failed to delete head:", err);
      alert("Error deleting head. Check console for details.");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p>Loading association heads...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        Admin — Manage Association Heads
      </h1>

      {/* Form */}
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
              ID <span className="text-red-500">*</span>
            </label>
            <input
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Numeric ID"
              type="number"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              required
              disabled={!!editId}
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              placeholder="e.g. NITC001"
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
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1 text-gray-700">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              name="contactNumber"
              value={formData.contactNumber}
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

      {/* Table */}
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Current Association Heads
        </h2>

        {heads.length === 0 ? (
          <p className="text-gray-500 text-center">
            No association heads found in the database.
          </p>
        ) : (
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-2 px-3 text-left">ID</th>
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Email</th>
                <th className="py-2 px-3 text-left">College ID</th>
                <th className="py-2 px-3 text-left">Association</th>
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
                  <td className="py-2 px-3">{h.id}</td>
                  <td className="py-2 px-3">{h.name}</td>
                  <td className="py-2 px-3">{h.email}</td>
                  <td className="py-2 px-3">{h.collegeId}</td>
                  <td className="py-2 px-3">{h.associationName}</td>
                  <td className="py-2 px-3 text-center">{h.contactNumber}</td>
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
