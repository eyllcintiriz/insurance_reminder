// src/pages/Policies.js

import React, { useState } from 'react';
import { sampleUsers } from '../data/sampleData';
import PolicyModal from '../components/forms/PolicyModal';

const Policies = () => {
  const [customers] = useState(sampleUsers);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  
  // Tüm poliçeleri tek bir dizide topla
  const [allPolicies, setAllPolicies] = useState(() => {
    return sampleUsers.flatMap(user => 
      user.policies.map(policy => ({
        ...policy,
        customerId: user.id,
        customerName: `${user.firstName} ${user.lastName}`
      }))
    );
  });

  // Yeni poliçe ekleme fonksiyonu
  const handleAddPolicy = (newPolicy) => {
    setAllPolicies(prev => [...prev, newPolicy]);
    setIsPolicyModalOpen(false);
    
    // Başarı bildirimi
    console.log('Yeni poliçe eklendi:', newPolicy);
    alert(`${newPolicy.type} poliçesi ${newPolicy.customerName} için başarıyla eklendi!`);
  };

  const getStatusColor = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const daysLeft = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 30) return 'bg-red-100 text-red-800';
    if (daysLeft < 90) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const daysLeft = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return 'Süresi Dolmuş';
    if (daysLeft < 30) return `${daysLeft} gün kaldı`;
    if (daysLeft < 90) return `${daysLeft} gün kaldı`;
    return 'Aktif';
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Poliçe Listesi ({allPolicies.length})
          </h2>
          <button 
            onClick={() => setIsPolicyModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Yeni Poliçe Ekle</span>
          </button>
        </div>

        {/* Filter Options */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Poliçe numarası veya müşteri ara..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Tüm Poliçeler</option>
                <option>Kasko</option>
                <option>Trafik</option>
                <option>DASK</option>
                <option>Sağlık</option>
                <option>Hayat</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Tüm Durumlar</option>
                <option>Aktif</option>
                <option>Yenilenecek</option>
                <option>Süresi Dolmuş</option>
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

        {/* Policies Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {allPolicies.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz poliçe yok</h3>
              <p className="text-gray-500 mb-4">İlk poliçeyi oluşturmak için aşağıdaki butona tıklayın.</p>
              <button 
                onClick={() => setIsPolicyModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                İlk Poliçeyi Ekle
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Poliçe No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Müşteri
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sigorta Türü
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Şirket
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Araç Bilgisi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prim
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allPolicies.map((policy) => (
                    <tr key={policy.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {policy.policyNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {policy.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-medium text-xs">
                              {policy.customerName?.split(' ').map(n => n.charAt(0)).join('')}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {policy.customerName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {policy.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {policy.insuranceCompany}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {policy.vehicleInfo && ['Kasko', 'Trafik'].includes(policy.type) ? (
                          <div>
                            <div className="text-sm text-gray-900">
                              {policy.vehicleInfo.plate}
                            </div>
                            <div className="text-sm text-gray-500">
                              {policy.vehicleInfo.brand} {policy.vehicleInfo.model} ({policy.vehicleInfo.year})
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₺{policy.premium?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(policy.endDate)}`}>
                          {getStatusText(policy.endDate)}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          Bitiş: {new Date(policy.endDate).toLocaleDateString('tr-TR')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3 transition-colors">
                          Görüntüle
                        </button>
                        <button className="text-green-600 hover:text-green-900 mr-3 transition-colors">
                          Yenile
                        </button>
                        <button className="text-orange-600 hover:text-orange-900 mr-3 transition-colors">
                          Düzenle
                        </button>
                        <button className="text-red-600 hover:text-red-900 transition-colors">
                          İptal
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {allPolicies.length > 0 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Toplam <span className="font-medium">{allPolicies.length}</span> poliçe gösteriliyor
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
      </div>

      {/* Policy Modal */}
      <PolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        onAddPolicy={handleAddPolicy}
        customers={customers}
        selectedCustomer={null}
        isCustomerReadonly={false}
      />
    </>
  );
};

export default Policies;