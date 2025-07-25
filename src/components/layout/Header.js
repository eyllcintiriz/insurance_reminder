// src/components/layout/Header.js

import React from 'react';

const Header = ({ activeTab }) => {
  const getPageTitle = (tab) => {
    const titles = {
      dashboard: 'Dashboard',
      customers: 'Müşteriler',
      policies: 'Poliçeler',
      quotes: 'Teklifler',
      payments: 'Ödemeler',
      reports: 'Raporlar',
      settings: 'Ayarlar'
    };
    return titles[tab] || 'Dashboard';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">{getPageTitle(activeTab)}</h1>
          <span className="text-sm text-gray-500">Hoş geldiniz!</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            🌙
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              🔔
            </button>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </div>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Ara..."
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;