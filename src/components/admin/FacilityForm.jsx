import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

const FacilityForm = ({ facility, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    nama: '',
    tipe: 'Puskesmas',
    alamat: '',
    telepon: '',
    email: '',
    jamOperasional: '',
    latitude: '',
    longitude: '',
    status: true,
  });

  useEffect(() => {
    if (facility) {
      setFormData({
        nama: facility.nama || '',
        tipe: facility.tipe || 'Puskesmas',
        alamat: facility.alamat || '',
        telepon: facility.telepon || '',
        email: facility.email || '',
        jamOperasional: facility.jamOperasional || '',
        latitude: facility.latitude || '',
        longitude: facility.longitude || '',
        status: facility.status !== undefined ? facility.status : true,
      });
    }
  }, [facility]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleStatus = () => {
    setFormData((prev) => ({ ...prev, status: !prev.status }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(formData);
  };

  const inputClass =
    'w-full px-4 py-3 border border-[#E2ECEB] rounded-xl focus:ring-2 focus:ring-[#37F4B4] focus:border-[#37F4B4] outline-none transition-all text-sm text-[#022022]';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nama Faskes */}
      <div>
        <label className="block text-sm font-medium text-[#022022] mb-2">
          Nama Faskes
        </label>
        <input
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Masukkan nama fasilitas kesehatan"
          className={inputClass}
          required
        />
      </div>

      {/* Tipe */}
      <div>
        <label className="block text-sm font-medium text-[#022022] mb-2">
          Tipe
        </label>
        <select
          name="tipe"
          value={formData.tipe}
          onChange={handleChange}
          className={inputClass}
          required
        >
          <option value="Puskesmas">Puskesmas</option>
          <option value="Rumah Sakit">Rumah Sakit</option>
        </select>
      </div>

      {/* Alamat */}
      <div>
        <label className="block text-sm font-medium text-[#022022] mb-2">
          Alamat
        </label>
        <textarea
          name="alamat"
          value={formData.alamat}
          onChange={handleChange}
          placeholder="Masukkan alamat lengkap"
          rows={3}
          className={inputClass}
          required
        />
      </div>

      {/* Telepon & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#022022] mb-2">
            Telepon
          </label>
          <input
            type="tel"
            name="telepon"
            value={formData.telepon}
            onChange={handleChange}
            placeholder="(024) xxx-xxxx"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#022022] mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@faskes.go.id"
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Jam Operasional */}
      <div>
        <label className="block text-sm font-medium text-[#022022] mb-2">
          Jam Operasional
        </label>
        <input
          type="text"
          name="jamOperasional"
          value={formData.jamOperasional}
          onChange={handleChange}
          placeholder="Senin - Jumat: 08:00 - 16:00"
          className={inputClass}
        />
      </div>

      {/* Koordinat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#022022] mb-2">
            Latitude
          </label>
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="-6.9xxxx"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#022022] mb-2">
            Longitude
          </label>
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="110.4xxxx"
            className={inputClass}
          />
        </div>
      </div>

      {/* Status Toggle */}
      <div>
        <label className="block text-sm font-medium text-[#022022] mb-2">
          Status
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleStatus}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.status ? 'bg-[#37F4B4]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.status ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm text-[#566E70]">
            {formData.status ? 'Aktif' : 'Nonaktif'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          className="flex items-center gap-2 bg-[#022022] text-white px-6 py-3 rounded-xl hover:bg-[#033033] transition-colors font-medium text-sm"
        >
          <Save className="w-4 h-4" />
          {isEditing ? 'Simpan Perubahan' : 'Tambah Faskes'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 border border-[#E2ECEB] text-[#566E70] px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
        >
          <X className="w-4 h-4" />
          Batal
        </button>
      </div>
    </form>
  );
};

export default FacilityForm;
