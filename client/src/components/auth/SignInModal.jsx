import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function SignInModal({ onClose, onAuthenticated }) {
  const handleSuccess = async (credentialResponse) => {
    try {
      // Send token to backend for verification
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: credentialResponse.credential,
      });

      // expected: { success: true, user: { name, email }, token? }
      if (res.data?.success) {
        onAuthenticated(res.data.user, res.data.token); // parent navigates to /events
      } else {
        alert(res.data?.message || "Authentication failed");
      }
    } catch (err) {
      console.error(err);
      alert("Authentication failed — check console");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 🔹 Transparent blurred overlay instead of dark black */}
      <div
        className="absolute inset-0 bg-white/10 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* 🔹 Modal Card (same as before) */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6 w-96">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-4 text-center">
          Sign in with your NITC account
        </h3>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => alert("Google login error")}
          />
        </div>
      </div>
    </div>
  );
}
