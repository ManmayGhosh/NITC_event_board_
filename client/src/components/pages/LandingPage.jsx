// import React, { useState } from "react";
// import SignInModal from "../auth/SignInModal.jsx";
// import { useNavigate } from "react-router-dom";

// export default function LandingPage() {
//   const [showModal, setShowModal] = useState(null);
//   const navigate = useNavigate();

//   const handleAuthenticated = (user, token, mode) => {
//     setShowModal(null);

//     // store data in localStorage
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("token", token);
//     localStorage.setItem("mode", mode);

//     // redirect based on mode
//     if (mode === "guest") navigate("/guest/events");
//     else navigate("/user/events");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100 text-gray-800">
//       <header className="flex justify-between items-center p-5 bg-white/80 shadow-md">
//         <h1 className="text-3xl font-bold text-orange-700 drop-shadow-sm">
//           NITC Event Board
//         </h1>
//         <div className="space-x-3">
//           <button
//             className="px-4 py-2 rounded-lg border border-orange-400 text-orange-700 font-medium hover:bg-orange-50 transition"
//             onClick={() => setShowModal("signin")}
//           >
//             Sign In
//           </button>
//           <button
//             className="px-4 py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 shadow-md transition"
//             onClick={() => setShowModal("guest")}
//           >
//             Guest View
//           </button>
//         </div>
//       </header>

//       <main className="p-6 grid gap-6 md:grid-cols-3 sm:grid-cols-1">
//         {[1, 2, 3].map((i) => (
//           <div
//             key={i}
//             className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
//           >
//             <div className="h-40 bg-orange-300" />
//             <div className="p-4 space-y-3">
//               <div className="h-5 w-2/3 bg-orange-300 rounded" />
//               <div className="h-4 w-1/2 bg-orange-300 rounded" />
//               <div className="h-4 w-3/4 bg-orange-300 rounded" />
//             </div>
//           </div>
//         ))}
//       </main>

//       {showModal && (
//         <SignInModal
//           mode={showModal}
//           onClose={() => setShowModal(null)}
//           onAuthenticated={handleAuthenticated}
//         />
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import SignInModal from "../auth/SignInModal.jsx";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [showModal, setShowModal] = useState(null);
  const navigate = useNavigate();

  const handleAuthenticated = (user, token, mode) => {
    setShowModal(null);

    // store data in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("mode", mode);

    // redirect based on mode
    if (mode === "guest") navigate("/guest/events");
    else if (mode === "admin") navigate("/admin/admin_event_review");
    else navigate("/user/events");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100 text-gray-800">
      <header className="flex justify-between items-center p-5 bg-white/80 backdrop-blur-sm shadow-md border-b border-orange-200">
        <h1 className="text-3xl font-bold text-orange-700 drop-shadow-sm">
          NITC Event Board
        </h1>
        <div className="space-x-3">
          {/* 🟩 Normal Sign In */}
          <button
            className="px-4 py-2 rounded-lg border border-orange-400 text-orange-700 font-medium hover:bg-orange-50 transition"
            onClick={() => setShowModal("signin")}
          >
            Sign In
          </button>

          {/* 🟩 Guest View → also uses Google OAuth */}
          <button
            className="px-4 py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 shadow-md transition"
            onClick={() => setShowModal("guest")}
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

      {/* 🟩 Sign In / Guest OAuth Modal */}
      {showModal && (
        <SignInModal
          mode={showModal}
          onClose={() => setShowModal(null)}
          onAuthenticated={handleAuthenticated}
        />
      )}
    </div>
  );
}
