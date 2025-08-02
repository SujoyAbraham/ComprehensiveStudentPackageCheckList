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
    // Static configuration - no external dependencies needed
    const config = {
      version: '2.0.0',
      lastUpdate: new Date().toISOString(),
      features: {
        progressTracking: true,
        exportFeature: true,
        multiUser: true,
        customItems: true
      },
      tips: [
        "Your data is stored locally in your browser - don't clear your cache!",
        "Use the search function to quickly find specific items",
        "Pack items based on priority - High items first!",
        "Add custom items specific to your needs using the Add Custom Item button",
        "Share your checklist with family to collaborate on packing"
      ],
      categories: [
        "Essential Documents",
        "Electronics", 
        "Clothing",
        "Personal Care",
        "Academic Materials",
        "Kitchen Items",
        "Medical & Health",
        "Financial",
        "Miscellaneous",
        "Custom Items"
      ]
    };

    res.status(200).json(config);
  } catch (error) {
    console.error('Config error:', error);
    res.status(500).json({ error: 'Failed to load configuration' });
  }
}