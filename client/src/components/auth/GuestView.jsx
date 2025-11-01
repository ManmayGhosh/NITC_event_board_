import { useNavigate } from "react-router-dom";

function GuestView() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/events")}
      className="mt-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
    >
      Continue as Guest
    </button>
  );
}

export default GuestView;
