import React, { useRef } from "react";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";

export default function FileUpload({ filePreview, onFileSelect, onFileRemove }) {
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Harap unggah berkas berupa gambar (PNG, JPG, atau WEBP).");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      onFileSelect({
        fileObj: file,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        previewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="block font-poppins font-semibold text-xs sm:text-sm text-[#022022]">
        Tambahkan Bukti Pendukung <span className="text-gray-400 font-normal">(Opsional)</span>
      </label>

      {filePreview ? (
        <div className="relative p-3 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
              <img
                src={filePreview.previewUrl}
                alt="Bukti tangkapan layar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="truncate">
              <p className="font-poppins font-medium text-xs text-[#022022] truncate">
                {filePreview.name}
              </p>
              <p className="font-inter text-[11px] text-[#4B5E5E]">{filePreview.size}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onFileRemove}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
            title="Hapus gambar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="p-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#022022]/40 bg-white/50 hover:bg-white/80 transition-all cursor-pointer text-center space-y-2 group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleInputChange}
            accept="image/*"
            className="hidden"
          />
          <div className="w-10 h-10 rounded-full bg-[#022022]/10 text-[#022022] border border-[#022022]/15 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <p className="font-poppins font-semibold text-xs sm:text-sm text-[#022022]">
              Klik untuk unggah <span className="font-normal text-[#4B5E5E]">atau seret gambar ke sini</span>
            </p>
            <p className="font-inter text-[11px] text-gray-400 mt-0.5">
              Format PNG, JPG, atau WEBP (Maksimal 5 MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}