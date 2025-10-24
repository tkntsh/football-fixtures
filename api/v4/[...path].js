export default async function handler(req, res) {
  const { pathSegments } = req.query;  // Renamed to avoid conflict with Node.js 'path' module
  try {
    const fullPath = pathSegments.join('/');  // Now 'path' refers to the imported module
    const response = await fetch(`https://api.football-data.org/v4/${fullPath}`, {
      method: req.method,
      headers: {
        'X-Auth-Token': process.env.REACT_APP_FOOTBALLDATA_API_KEY,
      },
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy Error:', error);  // Log for Vercel dashboard debugging
    res.status(500).json({ error: error.message });
  }
}