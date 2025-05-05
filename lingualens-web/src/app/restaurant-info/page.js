'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RestaurantInfoPage() {
  const searchParams = useSearchParams();
  const restaurantName = searchParams.get('name') || '';
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!restaurantName) return;
      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/get-restaurant-info?name=${restaurantName}&location=New York`
        );
        const data = await response.json();
        console.log('Gelen veri:', data);
        if (response.ok) {
          setRestaurants(data.restaurants || []);
        } else {
          throw new Error('Veri alınamadı');
        }
      } catch (err) {
        setError('Restoran bilgileri getirilemedi.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [restaurantName]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Restoran Bilgileri</h1>
      {loading && <p>Yükleniyor...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {restaurants.length > 0 ? (
        <ul className="space-y-4">
          {restaurants.map((rest, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded shadow">
              <p className="text-xl font-semibold">{rest.name}</p>
              <p className="text-sm">Kategori: {rest.categories.join(', ')}</p>
              <p className="text-sm">Yorum Sayısı: {rest.review_count}</p>
              <p className="text-sm">Puan: {rest.rating} ⭐️</p>
              <p className="text-sm">
                Adres: {rest.location.address1}, {rest.location.city}
              </p>
              <p className="text-sm">Telefon: {rest.phone}</p>
              <a
                href={rest.url}
                className="text-blue-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Yelp’te Görüntüle
              </a>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>Hiç restoran bulunamadı.</p>
      )}
    </div>
  );
}
