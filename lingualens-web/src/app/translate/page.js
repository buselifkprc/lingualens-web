'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TranslatePage() {
  const searchParams = useSearchParams();
  const recognizedText = searchParams.get('text') || '';
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const translateText = async () => {
      if (!recognizedText) return;
      setLoading(true);
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: recognizedText,
            source: 'en',
            target: 'tr',
            format: 'text',
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setTranslatedText(data.translatedText);
        } else {
          throw new Error('API hatası');
        }
      } catch (err) {
        setError('Çeviri başarısız oldu.');
      } finally {
        setLoading(false);
      }
    };

    translateText();
  }, [recognizedText]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Çeviri Sonucu</h1>
      {loading && <p>Çeviriliyor...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {translatedText && <div className="bg-gray-800 p-4 rounded shadow">{translatedText}</div>}
    </div>
  );
}
