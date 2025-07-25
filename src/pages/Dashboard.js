// src/pages/Dashboard.js

import React, { useState } from 'react';
import AddCustomerModal from '../components/forms/AddCustomerModal';

const Dashboard = () => {
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);

  // Yeni müşteri ekleme fonksiyonu
  const handleAddCustomer = (newCustomer) => {
    // Burada normalde API çağrısı yapılır
    console.log('Dashboard\'dan yeni müşteri eklendi:', newCustomer);
    
    // Başarı bildirimi
    alert(`${newCustomer.firstName} ${newCustomer.lastName} başarıyla eklendi!`);
    
    // Modal'ı kapat
    setIsAddCustomerModalOpen(false);
    
    // TODO: Global state'e ekle veya parent component'e bildir
    // Şimdilik sadece console'da gösteriyoruz
  };

  return (
    <>
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Toplam Müşteri</p>
                <p className="text-3xl font-bold text-gray-900">127</p>
                <p className="text-green-500 text-sm">+12% bu ay</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Aktif Poliçe</p>
                <p className="text-3xl font-bold text-gray-900">234</p>
                <p className="text-green-500 text-sm">+8% bu ay</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Aylık Prim</p>
                <p className="text-3xl font-bold text-gray-900">₺48,250</p>
                <p className="text-green-500 text-sm">+15% bu ay</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Yenilenecek</p>
                <p className="text-3xl font-bold text-gray-900">18</p>
                <p className="text-orange-500 text-sm">30 gün içinde</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Yeni Müşteri - Modal'a bağlı */}
            <button 
              onClick={() => setIsAddCustomerModalOpen(true)}
              className="flex items-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">➕</span>
              </div>
              <div className="ml-4 text-left">
                <p className="font-medium text-gray-900">Yeni Müşteri</p>
                <p className="text-sm text-gray-500">Müşteri ekle</p>
              </div>
            </button>

            {/* Yeni Poliçe */}
            <button className="flex items-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all duration-200 group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">📄</span>
              </div>
              <div className="ml-4 text-left">
                <p className="font-medium text-gray-900">Yeni Poliçe</p>
                <p className="text-sm text-gray-500">Poliçe oluştur</p>
              </div>
            </button>

            {/* Teklif Hazırla */}
            <button className="flex items-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all duration-200 group">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                <span className="text-2xl">🧮</span>
              </div>
              <div className="ml-4 text-left">
                <p className="font-medium text-gray-900">Teklif Hazırla</p>
                <p className="text-sm text-gray-500">Hızlı teklif</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Yaklaşan Yenilemeler</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600">⚠️</span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Ahmet Yılmaz</p>
                <p className="text-xs text-gray-500">Kasko - 3 gün kaldı</p>
              </div>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Acil</span>
            </div>

            <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600">⏰</span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Elif Kaya</p>
                <p className="text-xs text-gray-500">Trafik - 15 gün kaldı</p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Yakın</span>
            </div>

            <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">✅</span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Mehmet Demir</p>
                <p className="text-xs text-gray-500">DASK - 45 gün kaldı</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Normal</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors">
              Tüm Yenilemeleri Görüntüle →
            </button>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      <AddCustomerModal 
        isOpen={isAddCustomerModalOpen}
        onClose={() => setIsAddCustomerModalOpen(false)}
        onAddCustomer={handleAddCustomer}
      />
    </>
  );
};

export default Dashboard;