import { get } from '@vercel/edge-config';

export default async function handler(req, res) {
  // Set CORS headers for frontend access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Only store minimal config data in Edge Config
    // Most data will be cached in browser
    const config = await get('app-config') || {
      version: '1.0.0',
      lastUpdate: new Date().toISOString(),
      features: {
        progressTracking: true,
        exportFeature: false,
        multiUser: false
      },
      tips: [
        "Don't clear your browser cache to keep your progress!",
        "Use the search function to quickly find specific items",
        "Pack items based on priority - High items first!"
      ]
    };

    res.status(200).json(config);
  } catch (error) {
    console.error('Edge Config error:', error);
    // Fallback config if Edge Config fails
    res.status(200).json({
      version: '1.0.0',
      lastUpdate: new Date().toISOString(),
      features: {
        progressTracking: true,
        exportFeature: false,
        multiUser: false
      },
      tips: [
        "Don't clear your browser cache to keep your progress!",
        "Use the search function to quickly find specific items",
        "Pack items based on priority - High items first!"
      ]
    });
  }
}