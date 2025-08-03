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


// Verify database connection (data should already exist)
async function verifyConnection() {
  try {
    const connection = await getConnection();
    
    // Just verify the connection works
    await connection.execute('SELECT 1');
    console.log('Checklist items API: Database connection verified');
  } catch (error) {
    console.error('Checklist items API: Database connection error:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
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
      console.log('📡 GET request to checklist items API');
      
      // Get all checklist items for the user
      const [rows] = await connection.execute(
        `SELECT id, category, item_name, quantity, remarks, cost, priority, 
                is_custom, is_packed, is_purchased, created_at, updated_at
         FROM checklist_items 
         WHERE user_id = ? 
         ORDER BY category, created_at`,
        [userId]
      );

      // Transform data into the expected format
      const checklistData = {};
      rows.forEach(row => {
        if (!checklistData[row.category]) {
          checklistData[row.category] = [];
        }
        
        checklistData[row.category].push({
          id: row.id,
          item: row.item_name,
          quantity: row.quantity,
          remarks: row.remarks,
          cost: row.cost,
          priority: row.priority,
          isCustom: row.is_custom,
          isPacked: row.is_packed,
          isPurchased: row.is_purchased,
          createdAt: row.created_at,
          updatedAt: row.updated_at
        });
      });

      res.status(200).json({
        success: true,
        data: checklistData,
        message: 'Checklist items retrieved from TiDB successfully'
      });

    } else if (req.method === 'POST') {
      console.log('➕ POST request to add checklist item');
      
      const { category, item, quantity, remarks, cost, priority, isCustom } = req.body;
      
      if (!category || !item) {
        return res.status(400).json({ error: 'Category and item name are required' });
      }

      const [result] = await connection.execute(
        `INSERT INTO checklist_items 
         (user_id, category, item_name, quantity, remarks, cost, priority, is_custom) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, category, item, quantity || '1', remarks || '', cost || '0', priority || 'Medium', !!isCustom]
      );
      
      res.status(201).json({
        success: true,
        data: { id: result.insertId },
        message: 'Checklist item added successfully'
      });

    } else if (req.method === 'PUT') {
      console.log('✏️ PUT request to update checklist item');
      
      const { id, category, item, quantity, remarks, cost, priority, isPacked, isPurchased } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'Item ID is required' });
      }

      const updateFields = [];
      const updateValues = [];
      
      if (category !== undefined) { updateFields.push('category = ?'); updateValues.push(category); }
      if (item !== undefined) { updateFields.push('item_name = ?'); updateValues.push(item); }
      if (quantity !== undefined) { updateFields.push('quantity = ?'); updateValues.push(quantity); }
      if (remarks !== undefined) { updateFields.push('remarks = ?'); updateValues.push(remarks); }
      if (cost !== undefined) { updateFields.push('cost = ?'); updateValues.push(cost); }
      if (priority !== undefined) { updateFields.push('priority = ?'); updateValues.push(priority); }
      if (isPacked !== undefined) { updateFields.push('is_packed = ?'); updateValues.push(!!isPacked); }
      if (isPurchased !== undefined) { updateFields.push('is_purchased = ?'); updateValues.push(!!isPurchased); }
      
      if (updateFields.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }
      
      updateValues.push(userId, id);
      
      await connection.execute(
        `UPDATE checklist_items SET ${updateFields.join(', ')} 
         WHERE user_id = ? AND id = ?`,
        updateValues
      );
      
      res.status(200).json({
        success: true,
        message: 'Checklist item updated successfully'
      });

    } else if (req.method === 'DELETE') {
      console.log('🗑️ DELETE request to remove checklist item');
      
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Item ID is required' });
      }

      await connection.execute(
        'DELETE FROM checklist_items WHERE user_id = ? AND id = ?',
        [userId, id]
      );
      
      res.status(200).json({
        success: true,
        message: 'Checklist item deleted successfully'
      });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Checklist items API error:', error);
    
    // Fallback response if TiDB is not configured
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res.status(200).json({
        success: true,
        data: req.method === 'GET' ? {} : null,
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