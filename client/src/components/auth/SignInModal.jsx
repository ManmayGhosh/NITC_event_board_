import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function SignInModal({ mode, onClose, onAuthenticated }) {
  const handleSuccess = async (credentialResponse) => {
    try {
      // send token to backend for verification
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: credentialResponse.credential,
      });

      if (res.data?.success) {
        const user = res.data.user;

        // 🔹 Temporary dummy role assignment until DB is ready
        let role = "guest";
        const email = user.email?.toLowerCase();

        if (email === "admin@nitc.ac.in") role = "admin";
        else if (email === "head@nitc.ac.in") role = "association_head";
        else if (email === "guest@nitc.ac.in") role = "guest";

        // store or pass role for later use
        const userWithRole = { ...user, role };

        onAuthenticated(userWithRole, res.data.token);
      } else {
        alert(res.data?.message || "Authentication failed");
      }
    } catch (err) {
      console.error(err);
      alert("Authentication failed — check console");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-4 text-center">
          {mode === "signin"
            ? "Sign in with your NITC account"
            : "Continue as Guest"}
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
