// Simple sharing implementation using URL-based data transfer
// No external storage dependencies - works with Vercel Hobby plan

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'POST') {
      // Create a shareable link with encoded data
      const { userName, userProgress, customItems } = req.body;
      
      if (!userName) {
        return res.status(400).json({ error: 'User name is required' });
      }

      // Create shareable data object
      const shareData = {
        owner: userName,
        progress: userProgress || {},
        customItems: customItems || {},
        createdAt: new Date().toISOString(),
        version: '2.0.0'
      };

      // Encode the data as a URL-safe base64 string
      const encodedData = Buffer.from(JSON.stringify(shareData)).toString('base64url');
      
      // Generate share URL with encoded data
      const origin = req.headers.origin || req.headers.host || 'localhost:3000';
      const shareUrl = `${origin.startsWith('http') ? origin : `https://${origin}`}?share=${encodedData}`;
      
      res.status(200).json({ 
        success: true, 
        shareUrl,
        shareData,
        message: 'Share link created successfully. Anyone with this link can view and collaborate on your checklist.'
      });

    } else if (req.method === 'GET') {
      // Decode shared data from URL parameter
      const { share: encodedData } = req.query;
      
      if (!encodedData) {
        return res.status(400).json({ error: 'Share data required' });
      }

      try {
        console.log('Received encoded data:', encodedData.substring(0, 50) + '...');
        // URL decode first, then base64url decode
        const urlDecodedData = decodeURIComponent(encodedData);
        console.log('URL decoded data:', urlDecodedData.substring(0, 50) + '...');
        const decodedData = JSON.parse(Buffer.from(urlDecodedData, 'base64url').toString());
        console.log('Successfully decoded share data for owner:', decodedData.owner);
        
        // Validate the data structure
        if (!decodedData.owner || !decodedData.createdAt) {
          return res.status(400).json({ error: 'Invalid share data format' });
        }

        res.status(200).json({
          success: true,
          data: decodedData,
          message: `Shared checklist from ${decodedData.owner}`
        });

      } catch (decodeError) {
        return res.status(400).json({ error: 'Invalid or corrupted share data' });
      }

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Share API error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}