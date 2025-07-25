// src/components/forms/PolicyModal.js

import React, { useState, useEffect } from 'react';
import { insuranceCompanies, insuranceTypes } from '../../data/sampleData';

const PolicyModal = ({ 
  isOpen, 
  onClose, 
  onAddPolicy, 
  customers = [], 
  selectedCustomer = null,
  isCustomerReadonly = false 
}) => {
  const [formData, setFormData] = useState({
    customerId: selectedCustomer?.id || '',
    insuranceCompany: '',
    policyNumber: '',
    type: '',
    premium: '',
    startDate: '',
    endDate: '',
    vehicleInfo: {
      plate: '',
      brand: '',
      model: '',
      year: ''
    },
    description: ''
  });

  const [errors, setErrors] = useState({});

  // selectedCustomer değiştiğinde formData'yı güncelle
  useEffect(() => {
    if (selectedCustomer) {
      setFormData(prev => ({
        ...prev,
        customerId: selectedCustomer.id
      }));
    }
  }, [selectedCustomer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('vehicle.')) {
      const vehicleField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        vehicleInfo: {
          ...prev.vehicleInfo,
          [vehicleField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
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

    // Müşteri seçimi kontrolü (sadece readonly değilse)
    if (!isCustomerReadonly && !formData.customerId) {
      newErrors.customerId = 'Müşteri seçimi zorunludur';
    }

    if (!formData.insuranceCompany.trim()) {
      newErrors.insuranceCompany = 'Sigorta şirketi zorunludur';
    }

    if (!formData.policyNumber.trim()) {
      newErrors.policyNumber = 'Poliçe numarası zorunludur';
    }

    if (!formData.type.trim()) {
      newErrors.type = 'Sigorta türü zorunludur';
    }

    if (!formData.premium.trim()) {
      newErrors.premium = 'Prim tutarı zorunludur';
    } else if (isNaN(formData.premium) || parseFloat(formData.premium) <= 0) {
      newErrors.premium = 'Geçerli bir prim tutarı girin';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Başlangıç tarihi zorunludur';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Bitiş tarihi zorunludur';
    }

    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      newErrors.endDate = 'Bitiş tarihi başlangıç tarihinden sonra olmalıdır';
    }

    // Araç sigortaları için araç bilgileri zorunlu
    if (['Kasko', 'Trafik'].includes(formData.type)) {
      if (!formData.vehicleInfo.plate.trim()) {
        newErrors.vehiclePlate = 'Plaka zorunludur';
      }
      if (!formData.vehicleInfo.brand.trim()) {
        newErrors.vehicleBrand = 'Marka zorunludur';
      }
      if (!formData.vehicleInfo.model.trim()) {
        newErrors.vehicleModel = 'Model zorunludur';
      }
      if (!formData.vehicleInfo.year.trim()) {
        newErrors.vehicleYear = 'Yıl zorunludur';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newPolicy = {
        id: Date.now(),
        ...formData,
        premium: parseFloat(formData.premium),
        createdAt: new Date().toISOString()
      };

      // Eğer müşteri bilgisi varsa, müşteri adını da ekle
      if (formData.customerId) {
        const customer = customers.find(c => c.id.toString() === formData.customerId.toString()) || selectedCustomer;
        if (customer) {
          newPolicy.customerName = `${customer.firstName} ${customer.lastName}`;
        }
      }

      onAddPolicy(newPolicy);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      customerId: selectedCustomer?.id || '',
      insuranceCompany: '',
      policyNumber: '',
      type: '',
      premium: '',
      startDate: '',
      endDate: '',
      vehicleInfo: {
        plate: '',
        brand: '',
        model: '',
        year: ''
      },
      description: ''
    });
    setErrors({});
    onClose();
  };

  const isVehicleInsurance = ['Kasko', 'Trafik'].includes(formData.type);
  const selectedCustomerInfo = selectedCustomer || customers.find(c => c.id.toString() === formData.customerId.toString());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isCustomerReadonly ? 'Müşteriye Poliçe Ekle' : 'Yeni Poliçe Ekle'}
          </h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Müşteri Seçimi */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Müşteri {!isCustomerReadonly && '*'}
              </label>
              {isCustomerReadonly ? (
                <div className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-medium text-sm">
                        {selectedCustomer?.firstName?.charAt(0)}{selectedCustomer?.lastName?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">
                        {selectedCustomer?.firstName} {selectedCustomer?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {selectedCustomer?.email} • {selectedCustomer?.phone}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <select
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.customerId ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Müşteri seçin</option>
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.firstName} {customer.lastName} - {customer.email}
                      </option>
                    ))}
                  </select>
                  {errors.customerId && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerId}</p>
                  )}
                  {selectedCustomerInfo && formData.customerId && (
                    <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                      <div className="text-sm text-blue-800">
                        <strong>Seçili Müşteri:</strong> {selectedCustomerInfo.firstName} {selectedCustomerInfo.lastName}
                      </div>
                      <div className="text-xs text-blue-600">
                        {selectedCustomerInfo.phone} • {selectedCustomerInfo.email}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sigorta Şirketi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sigorta Şirketi *
              </label>
              <select
                name="insuranceCompany"
                value={formData.insuranceCompany}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.insuranceCompany ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sigorta şirketi seçin</option>
                {insuranceCompanies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
              {errors.insuranceCompany && (
                <p className="text-red-500 text-sm mt-1">{errors.insuranceCompany}</p>
              )}
            </div>

            {/* Sigorta Türü */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sigorta Türü *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.type ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sigorta türü seçin</option>
                {insuranceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            {/* Poliçe Numarası */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poliçe Numarası *
              </label>
              <input
                type="text"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.policyNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="AXA-2024-001234"
              />
              {errors.policyNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.policyNumber}</p>
              )}
            </div>

            {/* Prim Tutarı */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prim Tutarı (₺) *
              </label>
              <input
                type="number"
                name="premium"
                value={formData.premium}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.premium ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="3500"
                min="0"
                step="0.01"
              />
              {errors.premium && (
                <p className="text-red-500 text-sm mt-1">{errors.premium}</p>
              )}
            </div>

            {/* Başlangıç Tarihi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlangıç Tarihi *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>

            {/* Bitiş Tarihi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bitiş Tarihi *
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
              )}
            </div>

            {/* Araç Bilgileri - Sadece Kasko/Trafik için */}
            {isVehicleInsurance && (
              <>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    Araç Bilgileri
                  </h3>
                </div>

                {/* Plaka */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plaka *
                  </label>
                  <input
                    type="text"
                    name="vehicle.plate"
                    value={formData.vehicleInfo.plate}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.vehiclePlate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="34 ABC 123"
                  />
                  {errors.vehiclePlate && (
                    <p className="text-red-500 text-sm mt-1">{errors.vehiclePlate}</p>
                  )}
                </div>

                {/* Marka */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marka *
                  </label>
                  <input
                    type="text"
                    name="vehicle.brand"
                    value={formData.vehicleInfo.brand}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.vehicleBrand ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Toyota"
                  />
                  {errors.vehicleBrand && (
                    <p className="text-red-500 text-sm mt-1">{errors.vehicleBrand}</p>
                  )}
                </div>

                {/* Model */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model *
                  </label>
                  <input
                    type="text"
                    name="vehicle.model"
                    value={formData.vehicleInfo.model}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.vehicleModel ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Corolla"
                  />
                  {errors.vehicleModel && (
                    <p className="text-red-500 text-sm mt-1">{errors.vehicleModel}</p>
                  )}
                </div>

                {/* Yıl */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model Yılı *
                  </label>
                  <input
                    type="number"
                    name="vehicle.year"
                    value={formData.vehicleInfo.year}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.vehicleYear ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="2020"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                  />
                  {errors.vehicleYear && (
                    <p className="text-red-500 text-sm mt-1">{errors.vehicleYear}</p>
                  )}
                </div>
              </>
            )}

            {/* Açıklama */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Poliçe ile ilgili ek bilgiler..."
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
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
              Poliçe Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PolicyModal;