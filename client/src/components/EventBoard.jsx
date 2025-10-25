import React, { useState } from 'react';
import { User } from 'lucide-react';
import SignIn from './SignIn';

const EventBoard = () => {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'signin'

  const handleLogin = () => {
    console.log('Login as User clicked');
    // You can add user login logic here later
  };

  const handleGuestView = () => {
    console.log('Guest View clicked - redirecting to sign in');
    setCurrentView('signin');
  };

  // Sign In View
  if (currentView === 'signin') {
    return <SignIn />;
  }

  // Home Page (Default)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">NIT Calicut Event Board</h1>
          <p className="text-gray-600">Choose your access level</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-md"
          >
            <User size={20} />
            Login as User
          </button>
          
          <button
            onClick={handleGuestView}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-md"
          >
            <User size={20} />
            Guest View
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventBoard;