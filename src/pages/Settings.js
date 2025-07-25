// src/pages/Settings.js

import React from 'react';

const Settings = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Ayarlar</h2>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <span className="text-6xl mb-4 block">⚙️</span>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ayarlar Sayfası</h3>
        <p className="text-gray-500 mb-4">Bu sayfa henüz geliştirilme aşamasında...</p>
        <div className="text-sm text-gray-400">
          <p>Yakında eklenecek özellikler:</p>
          <ul className="mt-2 space-y-1">
            <li>• Kullanıcı profili</li>
            <li>• Sistem ayarları</li>
            <li>• Bildirim tercihleri</li>
            <li>• Güvenlik ayarları</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;