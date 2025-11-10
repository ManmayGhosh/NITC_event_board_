import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function SignInModal({ mode, onClose, onAuthenticated }) {
  const handleSuccess = async (credentialResponse) => {
    try {
      // Step 1: Verify Google token with backend
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: credentialResponse.credential,
      });

      if (!res.data?.success) {
        alert(res.data?.message || "Authentication failed");
        return;
      }

      const user = res.data.user;
      const email = user.email?.toLowerCase();
      let role = "guest"; // default fallback role

      // 🧠 Step 2: Check for admin
      if (email === "joseph_m250356cs@nitc.ac.in") {
        role = "admin";
      } else {
        // 🧠 Step 3: Check if user is association head from DB
        try {
          const checkRes = await axios.get(
            "http://localhost:5000/heads/check",
            {
              params: { email },
            }
          );

          if (checkRes.data.exists) {
            role = "association_head";
            console.log(`✅ ${email} recognized as association head`);
          } else if (mode === "guest") {
            role = "guest";
            console.log(`👤 ${email} signed in as guest`);
          } else {
            role = "guest";
            console.log(`👤 ${email} not found in association head list`);
          }
        } catch (err) {
          console.error("Error checking association heads:", err);
          role = "guest";
        }
      }

      // 🟩 Store user data
      const userWithRole = { ...user, role };
      localStorage.setItem("mode", role);
      localStorage.setItem("user", JSON.stringify(userWithRole));
      localStorage.setItem("token", res.data.token);

      // 🧭 Redirect based on role
      if (role === "guest") window.location.href = "/guest/events";
      else if (role === "admin")
        window.location.href = "/admin/admin_event_review";
      else if (role === "association_head")
        window.location.href = "/user/events";
      else window.location.href = "/";

      onAuthenticated(userWithRole, res.data.token, mode);
    } catch (err) {
      console.error("❌ Authentication error:", err);
      alert("Authentication failed — check console for details.");
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
          {mode === "guest"
            ? "Continue with Google as Guest"
            : "Sign in with your NITC account"}
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
