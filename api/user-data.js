import { get, set } from '@vercel/edge-config';

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
      // Get user data from Edge Config
      const userData = await get('user-data');
      
      if (!userData) {
        return res.status(200).json({
          success: true,
          data: null,
          message: 'No user data found'
        });
      }

      // Decompress and return data
      const decompressedData = decompressData(userData);
      res.status(200).json({
        success: true,
        data: decompressedData,
        message: 'User data retrieved successfully'
      });

    } else if (req.method === 'POST' || req.method === 'PUT') {
      // Save user data to Edge Config
      const { firstName, lastName, progress, customItems } = req.body;
      
      if (!firstName || !lastName) {
        return res.status(400).json({ error: 'First name and last name are required' });
      }

      // Compress data to minimize storage
      const compressedData = compressData({
        firstName,
        lastName,
        progress: progress || {},
        customItems: customItems || {},
        lastUpdate: Date.now()
      });

      // Store in Edge Config
      await set('user-data', compressedData);
      
      res.status(200).json({
        success: true,
        message: 'User data saved successfully',
        dataSize: JSON.stringify(compressedData).length
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

// Compress data to minimize storage usage
function compressData(data) {
  return {
    // Use short keys to save space
    n: `${data.firstName} ${data.lastName}`, // Full name as single string
    p: compressProgress(data.progress), // Compressed progress
    c: compressCustomItems(data.customItems), // Compressed custom items
    t: data.lastUpdate // Timestamp
  };
}

// Decompress data back to full format
function decompressData(compressed) {
  const [firstName, ...lastNameParts] = compressed.n.split(' ');
  return {
    firstName,
    lastName: lastNameParts.join(' '),
    progress: decompressProgress(compressed.p || {}),
    customItems: decompressCustomItems(compressed.c || {}),
    lastUpdate: compressed.t
  };
}

// Compress progress data - only store true values and use item IDs
function compressProgress(progress) {
  const compressed = {};
  
  Object.entries(progress).forEach(([key, value]) => {
    if (value === 'true' || value === true) {
      // Extract item ID and type (packed-123 -> p123, purchased-456 -> u456)
      const match = key.match(/^(packed|purchased)-(.+)$/);
      if (match) {
        const type = match[1] === 'packed' ? 'p' : 'u';
        const itemId = match[2];
        compressed[type + itemId] = 1; // Use 1 instead of true to save space
      }
    }
  });
  
  return compressed;
}

// Decompress progress data back to full format
function decompressProgress(compressed) {
  const progress = {};
  
  Object.entries(compressed).forEach(([key, value]) => {
    if (value === 1) {
      const type = key[0] === 'p' ? 'packed' : 'purchased';
      const itemId = key.substring(1);
      progress[`${type}-${itemId}`] = 'true';
    }
  });
  
  return progress;
}

// Compress custom items - use shorter keys and minimize data
function compressCustomItems(customItems) {
  const compressed = {};
  
  Object.entries(customItems).forEach(([id, item]) => {
    compressed[id] = {
      n: item.name,
      c: item.category,
      p: item.priority,
      q: item.quantity || 1,
      r: item.remarks || '',
      e: item.estimatedCost || 0
    };
  });
  
  return compressed;
}

// Decompress custom items back to full format
function decompressCustomItems(compressed) {
  const customItems = {};
  
  Object.entries(compressed).forEach(([id, item]) => {
    customItems[id] = {
      name: item.n,
      category: item.c,
      priority: item.p,
      quantity: item.q || 1,
      remarks: item.r || '',
      estimatedCost: item.e || 0
    };
  });
  
  return customItems;
}