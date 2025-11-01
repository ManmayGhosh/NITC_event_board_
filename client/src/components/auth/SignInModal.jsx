import React from "react";
import { GoogleLogin } from "@react-oauth/google";

export default function SignInModal({ onClose, onSuccess }) {
  const handleSuccess = (credentialResponse) => {
    // send token to backend for verification
    fetch("http://localhost:5000/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          onSuccess(data.user); // authenticated, go to real EventBoard
        } else {
          alert("Invalid domain. Only @nitc.ac.in allowed.");
        }
      })
      .catch(() => alert("Auth failed, try again."));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Sign in with NITC Email</h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => alert("Login Failed")}
        />
      </div>
    </div>
  );
}
