// src/pages/Reports.js

import React from 'react';

const Reports = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Raporlar</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Rapor Oluştur
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <span className="text-6xl mb-4 block">📈</span>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Raporlar Sayfası</h3>
        <p className="text-gray-500 mb-4">Bu sayfa henüz geliştirilme aşamasında...</p>
        <div className="text-sm text-gray-400">
          <p>Yakında eklenecek özellikler:</p>
          <ul className="mt-2 space-y-1">
            <li>• Satış raporları</li>
            <li>• Müşteri analizleri</li>
            <li>• Komisyon raporları</li>
            <li>• Grafik ve tablolar</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reports;