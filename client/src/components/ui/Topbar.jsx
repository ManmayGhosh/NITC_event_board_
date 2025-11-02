import React from 'react';

export default function Topbar() {
  const handleLogout = () => {
    // TODO: Add your logout logic (clear token, redirect, etc.)
    console.log('Logged out');
  };

  return (
    <header className="flex justify-end items-center bg-white shadow p-4">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>
  );
}
