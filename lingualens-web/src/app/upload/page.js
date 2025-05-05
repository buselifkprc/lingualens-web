'use client'

import { useState, useRef } from 'react'

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewURL, setPreviewURL] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewURL(URL.createObjectURL(file))
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-white">
      <h1 className="text-2xl font-bold mb-6 text-black">📸 Fotoğraf Yükle ve Önizle</h1>

      {/* Gizli input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      {/* Stilize buton */}
      <button
        onClick={() => fileInputRef.current.click()}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow font-semibold mb-4 transition"
      >
        Dosya Seç
      </button>

      {previewURL && (
        <div className="mb-4">
          <img src={previewURL} alt="Önizleme" className="max-w-xs rounded shadow" />
        </div>
      )}

      {selectedFile && (
        <p className="text-sm text-black">
          Seçilen dosya: <span className="font-medium">{selectedFile.name}</span>
        </p>
      )}
    </main>
  )
}
