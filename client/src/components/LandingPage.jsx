import React, { useState } from "react";
import SignInModal from "./auth/SignInModal.jsx";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAuthenticated = (user, token) => {
    // you can store token/user if wanted:
    // localStorage.setItem('user', JSON.stringify(user));
    // localStorage.setItem('token', token);
    setShowModal(false);
    // navigate to event board showing real events
    navigate("/events");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center p-5 bg-white shadow-sm">
        <h1 className="text-2xl font-bold">NITC Event Board</h1>
        <div className="space-x-3">
          <button className="px-4 py-2 rounded border" onClick={() => {/* reserved for future SignIn */}}>
            Sign In
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white"
            onClick={() => setShowModal(true)} // IMPORTANT: Guest View opens the sign-in modal
          >
            Guest View
          </button>
        </div>
      </header>

      {/* rest of your existing landing content (3 dummy cards) */}
      <main className="p-6 grid gap-6 md:grid-cols-3 sm:grid-cols-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-md animate-pulse overflow-hidden"
          >
            <div className="h-40 bg-gray-300"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 w-2/3 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </main>

      {showModal && (
        <SignInModal
          onClose={() => setShowModal(false)}
          onAuthenticated={handleAuthenticated}
        />
      )}
    </div>
  );
}
