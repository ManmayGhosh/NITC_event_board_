import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GuestView from "./GuestView.jsx";

function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: credentialResponse.credential,
      });

      if (res.data.user) {
        navigate("/events");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Sign In to NITC Event Board</h1>

      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => setError("Login Failed")}
      />

      <GuestView />

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default SignIn;
