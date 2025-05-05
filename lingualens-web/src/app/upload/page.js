'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/ocr/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const ocrText = data.recognized_text;
        router.push(`/translate?text=${encodeURIComponent(ocrText)}`);
      } else {
        throw new Error(data.detail || 'OCR başarısız.');
      }
    } catch (err) {
      setError(err.message || 'Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">📸 Fotoğraf Yükle ve Önizle</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {previewUrl && (
        <img src={previewUrl} alt="Önizleme" className="w-64 h-auto rounded mb-4 shadow" />
      )}

      <button
        onClick={handleUpload}
        disabled={loading || !selectedFile}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        {loading ? 'Yükleniyor...' : 'OCR Yap'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
