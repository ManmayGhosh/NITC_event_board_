import React, { useState } from "react";
import SignInModal from "./auth/SignInModal.jsx";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAuthenticated = (user, token) => {
    setShowModal(false);
    navigate("/events");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100 text-gray-800 transition-all duration-300">
      <header className="flex justify-between items-center p-5 bg-white/80 backdrop-blur-sm shadow-md border-b border-orange-200">
        <h1 className="text-3xl font-bold text-orange-700 drop-shadow-sm">
          NITC Event Board
        </h1>
        <div className="space-x-3">
          <button
            className="px-4 py-2 rounded-lg border border-orange-400 text-orange-700 font-medium hover:bg-orange-50 transition"
            onClick={() => {}}
          >
            Sign In
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 shadow-md transition"
            onClick={() => setShowModal(true)}
          >
            Guest View
          </button>
        </div>
      </header>

      <main className="p-6 grid gap-6 md:grid-cols-3 sm:grid-cols-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
          >
            <div className="h-40 bg-orange-300" />
            <div className="p-4 space-y-3">
              <div className="h-5 w-2/3 bg-orange-300 rounded" />
              <div className="h-4 w-1/2 bg-orange-300 rounded" />
              <div className="h-4 w-3/4 bg-orange-300 rounded" />
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
