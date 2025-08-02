// Simple sharing implementation for single-user Edge Config setup
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // For single-user setup, sharing is disabled
  res.status(501).json({ 
    error: 'Sharing functionality disabled for single-user setup',
    message: 'This application is configured for single-user use with Edge Config storage.'
  });
}