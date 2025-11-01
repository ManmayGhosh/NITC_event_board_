import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn.jsx";
import GuestView from './components/auth/GuestView.jsx';
import EventBoard from "./components/EventBoard.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="538117072049-8907ltgukeqfvhjnp464o9f379qmljmn.apps.googleusercontent.com">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/events" element={<EventBoard />} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>,
)
