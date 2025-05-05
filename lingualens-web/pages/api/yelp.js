export default async function handler(req, res) {
    const { term, location } = req.query;
  
    try {
      const response = await fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=1`, {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json(data.businesses[0]);
      } else {
        res.status(500).json({ error: 'Yelp API hatası', details: data });
      }
    } catch (err) {
      res.status(500).json({ error: 'Sunucu hatası', details: err.message });
    }
  }
  