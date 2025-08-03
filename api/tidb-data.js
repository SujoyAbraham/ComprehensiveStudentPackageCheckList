import mysql from 'mysql2/promise';

// TiDB Serverless connection configuration
const dbConfig = {
  host: process.env.TIDB_HOST,
  port: process.env.TIDB_PORT || 4000,
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE || 'checklist',
  ssl: {
    rejectUnauthorized: false
  },
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000
};

let pool;

async function getConnection() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// Verify database connection (tables should already exist)
async function verifyConnection() {
  try {
    const connection = await getConnection();
    
    // Just verify the connection works
    await connection.execute('SELECT 1');
    console.log('Database connection verified');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

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
    // Verify database connection
    await verifyConnection();
    
    const connection = await getConnection();
    const userId = 'anub_abby'; // Single user system

    if (req.method === 'GET') {
      console.log('📡 GET request to TiDB API');
      
      const [rows] = await connection.execute(
        'SELECT * FROM user_data WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1',
        [userId]
      );

      if (rows.length === 0) {
        return res.status(200).json({
          success: true,
          data: null,
          message: 'No user data found in TiDB'
        });
      }

      const userData = rows[0];
      res.status(200).json({
        success: true,
        data: {
          firstName: userData.first_name,
          lastName: userData.last_name,
          progress: userData.progress_data || {},
          customItems: userData.custom_items || {},
          lastUpdate: userData.updated_at
        },
        message: 'User data retrieved from TiDB successfully'
      });

    } else if (req.method === 'POST' || req.method === 'PUT') {
      console.log('💾 Save request to TiDB API');
      
      const { firstName, lastName, progress, customItems } = req.body;
      
      if (!firstName || !lastName) {
        return res.status(400).json({ error: 'First name and last name are required' });
      }

      // Calculate data size for monitoring
      const dataSize = Buffer.byteLength(JSON.stringify(req.body), 'utf8');
      
      // Upsert user data
      await connection.execute(
        `INSERT INTO user_data (user_id, first_name, last_name, progress_data, custom_items) 
         VALUES (?, ?, ?, ?, ?) 
         ON DUPLICATE KEY UPDATE 
         first_name = VALUES(first_name), 
         last_name = VALUES(last_name), 
         progress_data = VALUES(progress_data), 
         custom_items = VALUES(custom_items),
         updated_at = CURRENT_TIMESTAMP`,
        [userId, firstName, lastName, JSON.stringify(progress || {}), JSON.stringify(customItems || {})]
      );
      
      res.status(200).json({
        success: true,
        message: 'User data saved to TiDB successfully',
        dataSize: dataSize,
        storage: 'TiDB Serverless (Free Tier)',
        crossBrowser: true
      });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('TiDB API error:', error);
    
    // Fallback response if TiDB is not configured
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res.status(200).json({
        success: true,
        data: req.method === 'GET' ? {
          firstName: 'Anub',
          lastName: 'Abby',
          progress: {},
          customItems: {},
          lastUpdate: new Date()
        } : null,
        message: 'TiDB not configured - using fallback mode',
        note: 'Set TIDB_* environment variables for cloud persistence'
      });
    }
    
    res.status(500).json({ 
      error: 'Database error', 
      details: error.message 
    });
  }
}