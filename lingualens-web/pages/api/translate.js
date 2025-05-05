export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Yalnızca POST isteği desteklenir.' });
  }

  try {
    const response = await fetch('http://localhost:5001/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: req.body.q,
        source: req.body.source,
        target: req.body.target,
        format: req.body.format,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ error: 'Çeviri API hatası.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Sunucu isteği başarısız oldu.', details: err.message });
  }
}
