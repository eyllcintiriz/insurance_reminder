// src/components/layout/Sidebar.js

import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'customers', name: 'Müşteriler', icon: '👥' },
    { id: 'policies', name: 'Poliçeler', icon: '📋' },
    { id: 'quotes', name: 'Teklifler', icon: '💰' },
    { id: 'payments', name: 'Ödemeler', icon: '💳' },
    { id: 'reports', name: 'Raporlar', icon: '📈' },
    { id: 'settings', name: 'Ayarlar', icon: '⚙️' }
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-lg font-bold">A</span>
          </div>
          <span className="text-xl font-bold text-white">AcenteOS</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-500 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-lg mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 w-full p-4">
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">SA</span>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">Super Admin</p>
            <p className="text-xs text-gray-500">admin@acenteos.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;