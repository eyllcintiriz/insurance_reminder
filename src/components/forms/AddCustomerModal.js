// src/components/forms/AddCustomerModal.js

import React, { useState } from 'react';
import PolicyModal from './PolicyModal';
import PolicyList from './PolicyList';

const AddCustomerModal = ({ isOpen, onClose, onAddCustomer }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    tcNo: '',
    birthDate: ''
  });

  const [policies, setPolicies] = useState([]);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Hata varsa temizle
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Ad zorunludur';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Soyad zorunludur';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email zorunludur';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi girin';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon zorunludur';
    } else if (!/^[0-9\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası girin';
    }

    if (!formData.tcNo.trim()) {
      newErrors.tcNo = 'TC Kimlik No zorunludur';
    } else if (!/^[0-9]{11}$/.test(formData.tcNo.replace(/\s/g, ''))) {
      newErrors.tcNo = 'TC Kimlik No 11 haneli olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPolicy = (newPolicy) => {
    setPolicies(prev => [...prev, newPolicy]);
    setIsPolicyModalOpen(false);
  };

  const handleRemovePolicy = (policyId) => {
    setPolicies(prev => prev.filter(policy => policy.id !== policyId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Yeni müşteri objesi oluştur
      const newCustomer = {
        id: Date.now(), // Geçici ID
        ...formData,
        policies: policies, // Eklenen poliçeler
        createdAt: new Date().toISOString()
      };

      onAddCustomer(newCustomer);
      
      // Formu temizle
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        tcNo: '',
        birthDate: ''
      });
      setPolicies([]);
      
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      tcNo: '',
      birthDate: ''
    });
    setPolicies([]);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Yeni Müşteri Ekle</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Müşteri Bilgileri */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Müşteri Bilgileri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Müşteri adı"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                {/* Soyad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soyad *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Müşteri soyadı"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ornek@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Telefon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0532 123 45 67"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* TC Kimlik No */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TC Kimlik No *
                  </label>
                  <input
                    type="text"
                    name="tcNo"
                    value={formData.tcNo}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.tcNo ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="12345678901"
                    maxLength="11"
                  />
                  {errors.tcNo && (
                    <p className="text-red-500 text-sm mt-1">{errors.tcNo}</p>
                  )}
                </div>

                {/* Doğum Tarihi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doğum Tarihi
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Şehir */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şehir
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Şehir seçin</option>
                    <option value="İstanbul">İstanbul</option>
                    <option value="Ankara">Ankara</option>
                    <option value="İzmir">İzmir</option>
                    <option value="Bursa">Bursa</option>
                    <option value="Antalya">Antalya</option>
                    <option value="Adana">Adana</option>
                    <option value="Gaziantep">Gaziantep</option>
                    <option value="Konya">Konya</option>
                    <option value="Kayseri">Kayseri</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                {/* Adres */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tam adres bilgisi..."
                  />
                </div>
              </div>
            </div>

            {/* Poliçeler Bölümü */}
            <div className="mb-8 border-t border-gray-200 pt-6">
              <PolicyList
                policies={policies}
                onAddPolicy={() => setIsPolicyModalOpen(true)}
                onRemovePolicy={handleRemovePolicy}
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Müşteri Ekle
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Policy Modal */}
      <PolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        onAddPolicy={handleAddPolicy}
        customers={[]}
        selectedCustomer={{ 
          id: 'temp', 
          firstName: formData.firstName || 'Yeni', 
          lastName: formData.lastName || 'Müşteri',
          email: formData.email || '',
          phone: formData.phone || ''
        }}
        isCustomerReadonly={true}
      />
    </>
  );
};

export default AddCustomerModal;