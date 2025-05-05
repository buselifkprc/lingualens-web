'use client';

import { useEffect, useState } from 'react';

export default function RestaurantPage() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch('/api/yelp?term=Sultanahmet Köftecisi&location=İstanbul');
        const data = await res.json();
        if (res.ok) {
          setRestaurant(data);
        } else {
          setError('API hatası');
        }
      } catch (err) {
        setError('İstek başarısız.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []);

  if (loading) return <div className="p-6">Yükleniyor...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!restaurant) return <div className="p-6">Restoran bulunamadı.</div>;

  return (
    <div className="min-h-screen bg-white p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">🍽️ Restoran Bilgileri</h1>
      <div className="bg-gray-100 p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold">{restaurant.name}</h2>
        <p>{restaurant.location.address1}, {restaurant.location.city}</p>
        <p>📞 {restaurant.display_phone}</p>
        <p>⭐ {restaurant.rating} / 5 ({restaurant.review_count} yorum)</p>
        <p className={restaurant.is_closed ? "text-red-500" : "text-green-600"}>
          {restaurant.is_closed ? "Kapalı" : "Açık"}
        </p>
        <div className="mt-2">
          {restaurant.categories.map((cat, idx) => (
            <span key={idx} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 text-sm">
              {cat.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
