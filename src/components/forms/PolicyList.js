// src/components/forms/PolicyList.js

import React, { useState } from 'react';

const PolicyList = ({ policies, onAddPolicy, onRemovePolicy }) => {
  const [expandedPolicy, setExpandedPolicy] = useState(null);

  const toggleExpand = (policyId) => {
    setExpandedPolicy(expandedPolicy === policyId ? null : policyId);
  };

  const handleRemovePolicy = (policyId) => {
    if (window.confirm('Bu poliçeyi silmek istediğinizden emin misiniz?')) {
      onRemovePolicy(policyId);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Poliçeler ({policies.length})
        </h3>
        <button
          onClick={onAddPolicy}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Poliçe Ekle</span>
        </button>
      </div>

      {/* Policy List */}
      {policies.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-sm">Henüz poliçe eklenmemiş</p>
          <button
            onClick={onAddPolicy}
            className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            İlk poliçeyi ekle
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {policies.map((policy) => (
            <div key={policy.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Policy Header - Clickable */}
              <div
                onClick={() => toggleExpand(policy.id)}
                className="p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      policy.type === 'Kasko' ? 'bg-green-500' :
                      policy.type === 'Trafik' ? 'bg-blue-500' :
                      policy.type === 'DASK' ? 'bg-orange-500' :
                      policy.type === 'Sağlık' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {policy.type} - {policy.insuranceCompany}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {policy.policyNumber} • {formatCurrency(policy.premium)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      new Date(policy.endDate) > new Date() 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {new Date(policy.endDate) > new Date() ? 'Aktif' : 'Süresi Dolmuş'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePolicy(policy.id);
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Poliçeyi Sil"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        expandedPolicy === policy.id ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedPolicy === policy.id && (
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Poliçe Bilgileri</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Poliçe No:</span>
                          <span className="font-medium">{policy.policyNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Sigorta Şirketi:</span>
                          <span>{policy.insuranceCompany}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Prim Tutarı:</span>
                          <span className="font-medium text-green-600">{formatCurrency(policy.premium)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Başlangıç:</span>
                          <span>{formatDate(policy.startDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Bitiş:</span>
                          <span>{formatDate(policy.endDate)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Araç Bilgileri - Sadece araç sigortaları için */}
                    {['Kasko', 'Trafik'].includes(policy.type) && policy.vehicleInfo && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Araç Bilgileri</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Plaka:</span>
                            <span className="font-medium">{policy.vehicleInfo.plate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Marka/Model:</span>
                            <span>{policy.vehicleInfo.brand} {policy.vehicleInfo.model}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Model Yılı:</span>
                            <span>{policy.vehicleInfo.year}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Açıklama */}
                    {policy.description && (
                      <div className="md:col-span-2">
                        <h5 className="font-medium text-gray-900 mb-2">Açıklama</h5>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {policy.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PolicyList;