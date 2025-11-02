// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignIn from "./components/auth/SignIn.jsx";
// import GuestView from './components/auth/GuestView.jsx';
// import EventBoard from "./components/pages/EventBoard.jsx";
// import EventForm from "./components/pages/EventForm.jsx";
// import AdminEventReview from "./components/pages/AdminEventReview.jsx";
// import AdminAssociationManager from "./components/pages/AdminAssociationManager.jsx";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <GoogleOAuthProvider clientId="538117072049-8907ltgukeqfvhjnp464o9f379qmljmn.apps.googleusercontent.com">
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/events" element={<EventBoard />} />
//         <Route path="/submit-event" element={<EventForm />} />
//         <Route path="/admin/review" element={<AdminEventReview />} />
//         <Route path="/admin/associations" element={<AdminAssociationManager />} />
//       </Routes>
//     </BrowserRouter>
//   </GoogleOAuthProvider>,
// )

// ✅ main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="538117072049-8907ltgukeqfvhjnp464o9f379qmljmn.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
