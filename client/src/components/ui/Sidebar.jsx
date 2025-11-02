import React from 'react';

export default function Sidebar({ activePage, setActivePage }) {
  const buttons = [
    { id: 'eventView', label: 'Event View' },
    { id: 'submitEvent', label: 'Submit Event' },
    { id: 'adminHandleEvent', label: 'Admin Handle Event' },
    { id: 'adminHandleAssociation', label: 'Admin Handle Association' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="text-center py-4 text-2xl font-bold border-b border-gray-700">
        Dashboard
      </div>

      <nav className="flex flex-col mt-2">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActivePage(btn.id)}
            className={`px-6 py-3 text-left hover:bg-gray-700 transition ${
              activePage === btn.id ? 'bg-gray-700' : ''
            }`}
          >
            {btn.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
