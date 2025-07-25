// src/pages/Customers.js

import React, { useState } from 'react';
import { sampleUsers } from '../data/sampleData';
import AddCustomerModal from '../components/forms/AddCustomerModal';

const Customers = () => {
  const [customers, setCustomers] = useState(sampleUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Yeni müşteri ekleme fonksiyonu
  const handleAddCustomer = (newCustomer) => {
    setCustomers(prev => [...prev, newCustomer]);
    
    // Başarı bildirimi (geçici - console'da görünür)
    console.log('Yeni müşteri eklendi:', newCustomer);
    
    // Burada toast notification ekleyebiliriz
    alert(`${newCustomer.firstName} ${newCustomer.lastName} başarıyla eklendi!`);
  };

  // Arama ve filtreleme
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    const matchesFilter = 
      filterType === 'all' || 
      (filterType === 'active' && customer.policies.length > 0) ||
      (filterType === 'inactive' && customer.policies.length === 0);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Müşteri Listesi ({filteredCustomers.length})
        </h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Yeni Müşteri Ekle</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Müşteri ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tüm Müşteriler</option>
              <option value="active">Aktif Poliçeli</option>
              <option value="inactive">Pasif Müşteriler</option>
            </select>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
              <span>Filtrele</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {filteredCustomers.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Müşteri bulunamadı</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Arama kriterlerinize uygun müşteri bulunamadı.' : 'Henüz müşteri eklenmemiş.'}
            </p>
            {!searchTerm && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                İlk Müşteriyi Ekle
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Müşteri Bilgileri
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İletişim
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Poliçe Durumu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kayıt Tarihi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.firstName} {customer.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {customer.id} {customer.tcNo && `• TC: ${customer.tcNo}`}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{customer.phone}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                      {customer.city && (
                        <div className="text-xs text-gray-400">{customer.city}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        customer.policies.length > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.policies.length > 0 
                          ? `${customer.policies.length} Aktif Poliçe` 
                          : 'Poliçe Yok'
                        }
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {customer.createdAt 
                        ? new Date(customer.createdAt).toLocaleDateString('tr-TR')
                        : new Date().toLocaleDateString('tr-TR')
                      }
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3 transition-colors">
                        Görüntüle
                      </button>
                      <button className="text-green-600 hover:text-green-900 mr-3 transition-colors">
                        Düzenle
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 mr-3 transition-colors">
                        Poliçe Ekle
                      </button>
                      <button className="text-red-600 hover:text-red-900 transition-colors">
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredCustomers.length > 0 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Toplam <span className="font-medium">{filteredCustomers.length}</span> müşteri gösteriliyor
                  {searchTerm && <span> "<strong>{searchTerm}</strong>" araması için</span>}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                  Önceki
                </button>
                <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</span>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                  Sonraki
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      <AddCustomerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCustomer={handleAddCustomer}
      />
    </div>
  );
};

export default Customers;