// Simplified user data API - Edge Config is read-only for Hobby plan
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // For Hobby plan, we'll return a default response
      // since Edge Config is read-only and we can't actually store data
      console.log('GET request to user-data API');
      
      res.status(200).json({
        success: true,
        data: {
          firstName: 'Anub',
          lastName: 'Abby', 
          progress: {},
          customItems: {},
          lastUpdate: Date.now()
        },
        message: 'Default user data (Edge Config read-only on Hobby plan)'
      });

    } else if (req.method === 'POST' || req.method === 'PUT') {
      // Simulate saving data - log it but can't actually persist to Edge Config
      const { firstName, lastName, progress, customItems } = req.body;
      
      console.log('Simulated save:', {
        name: `${firstName} ${lastName}`,
        progressItems: Object.keys(progress || {}).length,
        customItems: Object.keys(customItems || {}).length
      });
      
      const jsonString = JSON.stringify(req.body);
      const sizeInBytes = Buffer.byteLength(jsonString, 'utf8');
      
      res.status(200).json({
        success: true,
        message: 'Data simulated save (Edge Config read-only on Hobby plan)',
        dataSize: sizeInBytes,
        compressionRatio: `${Math.round((1 - sizeInBytes / 8192) * 100)}% under 8KB limit`,
        note: 'Data is stored in browser only - upgrade Vercel plan for true persistence'
      });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('User data API error:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
}