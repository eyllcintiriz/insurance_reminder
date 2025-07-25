// src/pages/Quotes.js

import React from 'react';

const Quotes = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Teklifler</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Yeni Teklif Hazırla
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <span className="text-6xl mb-4 block">💰</span>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Teklifler Sayfası</h3>
        <p className="text-gray-500 mb-4">Bu sayfa henüz geliştirilme aşamasında...</p>
        <div className="text-sm text-gray-400">
          <p>Yakında eklenecek özellikler:</p>
          <ul className="mt-2 space-y-1">
            <li>• Teklif oluşturma</li>
            <li>• Teklif karşılaştırma</li>
            <li>• Fiyat hesaplama</li>
            <li>• PDF çıktı alma</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Quotes;