'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-100 px-4">
      <img src="/logo.png" alt="LinguaLens Logo" className="w-40 mb-8" />

      <div className="space-y-4 w-full max-w-xs">
        <button onClick={() => router.push('/upload')} className="w-full py-3 rounded-xl bg-purple-500 text-white font-semibold shadow-md hover:bg-purple-600 transition">
          📸 Fotoğraf Yükle ve Tanı
        </button>

        <button onClick={() => router.push('/translate')} className="w-full py-3 rounded-xl bg-indigo-500 text-white font-semibold shadow-md hover:bg-indigo-600 transition">
          🌍 Çeviri Sonuçları
        </button>

        <button onClick={() => router.push('/restaurant')} className="w-full py-3 rounded-xl bg-orange-400 text-white font-semibold shadow-md hover:bg-orange-500 transition">
          🍽️ Restoran Bilgisi
        </button>

        <button onClick={() => router.push('/login')} className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition">
          🔐 Giriş Ekranı
        </button>

        <button onClick={() => router.push('/register')} className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition">
          🆕 Kayıt Ekranı
        </button>
      </div>
    </main>
  )
}
