export default async function handler(req, res) {
  const { path } = req.query;
  try {
    const response = await fetch(`https://api.football-data.org/v4/${path.join('/')}`, {
      method: req.method,
      headers: {
        'X-Auth-Token': process.env.REACT_APP_FOOTBALLDATA_API_KEY,
      },
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}