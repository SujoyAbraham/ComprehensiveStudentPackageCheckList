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

      const jsonString = JSON.stringify(compressedData);
      const sizeInBytes = Buffer.byteLength(jsonString, 'utf8');
      
      // Check if size is under limit (8KB = 8192 bytes)
      if (sizeInBytes > 8192) {
        return res.status(413).json({
          error: 'Data too large for storage',
          currentSize: sizeInBytes,
          maxSize: 8192,
          message: 'Please reduce the number of custom items or progress data'
        });
      }

      // Store in Edge Config
      await set('user-data', compressedData);
      
      res.status(200).json({
        success: true,
        message: 'User data saved successfully',
        dataSize: sizeInBytes,
        compressionRatio: `${Math.round((1 - sizeInBytes / 8192) * 100)}% of limit used`
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

// Ultra-compress data to stay under 8KB limit
function compressData(data) {
  return {
    // Use single chars to save maximum space
    n: `${data.firstName} ${data.lastName}`, // Full name as single string
    p: compressProgress(data.progress), // Ultra-compressed progress (array format)
    c: compressCustomItems(data.customItems), // Ultra-compressed custom items
    t: Math.floor(data.lastUpdate / 1000) // Timestamp in seconds, not milliseconds
  };
}

// Decompress data back to full format
function decompressData(compressed) {
  const [firstName, ...lastNameParts] = compressed.n.split(' ');
  return {
    firstName,
    lastName: lastNameParts.join(' '),
    progress: decompressProgress(compressed.p || []),
    customItems: decompressCustomItems(compressed.c || []),
    lastUpdate: (compressed.t || 0) * 1000 // Convert back to milliseconds
  };
}

// Ultra-compress progress data - use arrays for maximum space efficiency
function compressProgress(progress) {
  const packed = [];
  const purchased = [];
  
  Object.entries(progress).forEach(([key, value]) => {
    if (value === 'true' || value === true) {
      const match = key.match(/^(packed|purchased)-(.+)$/);
      if (match) {
        const type = match[1];
        const itemId = match[2];
        if (type === 'packed') {
          packed.push(itemId);
        } else {
          purchased.push(itemId);
        }
      }
    }
  });
  
  // Return arrays: [packed_items, purchased_items]
  return [packed, purchased];
}

// Decompress progress data back to full format
function decompressProgress(compressed) {
  const progress = {};
  
  if (Array.isArray(compressed) && compressed.length === 2) {
    const [packed, purchased] = compressed;
    
    // Restore packed items
    (packed || []).forEach(itemId => {
      progress[`packed-${itemId}`] = 'true';
    });
    
    // Restore purchased items
    (purchased || []).forEach(itemId => {
      progress[`purchased-${itemId}`] = 'true';
    });
  }
  
  return progress;
}

// Ultra-compress custom items - use arrays and minimal encoding
function compressCustomItems(customItems) {
  const compressed = [];
  
  Object.entries(customItems).forEach(([category, items]) => {
    if (Array.isArray(items) && items.length > 0) {
      items.forEach(item => {
        // Store as array: [name, category, priority, quantity, remarks, cost]
        // Only store non-default values
        const compressedItem = [
          item.name,
          category.charAt(0), // First letter of category to save space
          item.priority.charAt(0), // H/M/L for High/Medium/Low
          item.quantity !== 1 ? item.quantity : null,
          item.remarks || null,
          item.estimatedCost || null
        ];
        
        // Remove trailing nulls to save space
        while (compressedItem.length > 3 && compressedItem[compressedItem.length - 1] === null) {
          compressedItem.pop();
        }
        
        compressed.push(compressedItem);
      });
    }
  });
  
  return compressed;
}

// Decompress custom items back to full format
function decompressCustomItems(compressed) {
  const customItems = {};
  const categoryMap = {
    'E': 'Essential Documents',
    'C': 'Clothing', 
    'P': 'Personal Care',
    'A': 'Academic Materials',
    'K': 'Kitchen Items',
    'M': 'Medical & Health',
    'F': 'Financial',
    'G': 'Groceries & Food',
    'O': 'Miscellaneous'
  };
  
  const priorityMap = { 'H': 'High', 'M': 'Medium', 'L': 'Low' };
  
  if (Array.isArray(compressed)) {
    compressed.forEach(item => {
      if (Array.isArray(item) && item.length >= 3) {
        const [name, categoryChar, priorityChar, quantity, remarks, cost] = item;
        const category = categoryMap[categoryChar] || 'Custom Items';
        
        if (!customItems[category]) {
          customItems[category] = [];
        }
        
        customItems[category].push({
          name,
          category,
          priority: priorityMap[priorityChar] || 'Medium',
          quantity: quantity || 1,
          remarks: remarks || '',
          estimatedCost: cost || 0
        });
      }
    });
  }
  
  return customItems;
}