'use client'
import React, { useState } from 'react';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrResult, setOcrResult] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setOcrResult('');
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Lütfen bir dosya seçin.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:8000/ocr', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setOcrResult(data.text);
      } else {
        setError(data.error || 'OCR hatası.');
      }
    } catch (err) {
      setError('Sunucuya bağlanırken hata oluştu.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Görselden Yazı Tanı</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 text-black"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Yükle ve Tara
      </button>

      {ocrResult && (
        <div className="mt-6 w-full max-w-xl bg-gray-800 p-4 rounded">
          <h2 className="font-semibold text-lg mb-2">Tanınan Metin:</h2>
          <pre className="whitespace-pre-wrap">{ocrResult}</pre>
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}
    </div>
  );
}
