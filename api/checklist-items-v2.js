import mysql from 'mysql2/promise';

// TiDB Serverless connection configuration - RU Optimized
const dbConfig = {
  host: process.env.TIDB_HOST,
  port: process.env.TIDB_PORT || 4000,
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE || 'checklist',
  ssl: {
    rejectUnauthorized: false
  },
  connectionLimit: 5, // Reduced for RU efficiency
  acquireTimeout: 30000, // Reduced timeout
  timeout: 30000, // Reduced timeout
  // RU optimization settings
  typeCast: function (field, next) {
    if (field.type === 'TINY' && field.length === 1) {
      return (field.string() === '1'); // Boolean conversion
    }
    return next();
  }
};

let pool;

async function getConnection() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// RU Optimized: Verify database connection with minimal query
async function verifyConnection() {
  try {
    const connection = await getConnection();
    
    // Minimal query to verify connection and test indexes
    const [result] = await connection.execute(
      'SELECT COUNT(*) as total_items FROM checklist_items USE INDEX (idx_user_category) WHERE user_id = ?',
      ['anub_abby']
    );
    
    console.log(`Enhanced Checklist API: Connection verified, ${result[0].total_items} items in database`);
  } catch (error) {
    console.error('Enhanced Checklist items API: Database connection error:', error);
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
      console.log('📡 GET request to enhanced checklist items API');
      
      // RU Optimized: Get all checklist items with category information using indexed query
      const [rows] = await connection.execute(
        `SELECT ci.id, ci.category_id, c.category_name, c.category_icon, 
                ci.item_name, ci.quantity, ci.remarks, ci.cost, ci.priority, 
                ci.is_custom, ci.is_packed, ci.is_purchased, ci.created_at, ci.updated_at
         FROM checklist_items ci
         USE INDEX (idx_user_category)
         JOIN categories c ON ci.category_id = c.id
         WHERE ci.user_id = ? AND c.is_active = TRUE
         ORDER BY c.display_order, ci.id`,
        [userId]
      );

      // RU Optimized: Get categories using index
      const [categories] = await connection.execute(
        `SELECT id, category_name, category_icon, description, display_order
         FROM categories 
         USE INDEX (idx_active, idx_display_order)
         WHERE is_active = TRUE 
         ORDER BY display_order`
      );

      // Transform data into the expected format
      const checklistData = {};
      const categoryMap = {};
      
      // Build category map
      categories.forEach(cat => {
        categoryMap[cat.id] = {
          name: cat.category_name,
          icon: cat.category_icon,
          description: cat.description,
          order: cat.display_order
        };
        checklistData[cat.category_name] = [];
      });

      // Populate items
      rows.forEach(row => {
        const categoryName = row.category_name;
        
        checklistData[categoryName].push({
          id: row.id,
          categoryId: row.category_id,
          item: row.item_name,
          quantity: row.quantity,
          remarks: row.remarks,
          cost: parseFloat(row.cost),
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
        categories: categoryMap,
        message: 'Enhanced checklist items retrieved from TiDB successfully'
      });

    } else if (req.method === 'POST') {
      console.log('➕ POST request to add enhanced checklist item');
      
      const { categoryId, categoryName, item, quantity, remarks, cost, priority, isCustom } = req.body;
      
      if (!item) {
        return res.status(400).json({ error: 'Item name is required' });
      }

      let finalCategoryId = categoryId;
      
      // If categoryName is provided but not categoryId, look up the category
      if (!finalCategoryId && categoryName) {
        const [catRows] = await connection.execute(
          'SELECT id FROM categories WHERE category_name = ? AND is_active = TRUE',
          [categoryName]
        );
        
        if (catRows.length > 0) {
          finalCategoryId = catRows[0].id;
        }
      }

      if (!finalCategoryId) {
        return res.status(400).json({ error: 'Valid category is required' });
      }

      const [result] = await connection.execute(
        `INSERT INTO checklist_items 
         (user_id, category_id, item_name, quantity, remarks, cost, priority, is_custom, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        [userId, finalCategoryId, item, quantity || '1', remarks || '', cost === '' || cost === null ? 500 : (isNaN(parseFloat(cost)) ? 500 : parseFloat(cost)), priority || 'Medium', !!isCustom]
      );
      
      // Log RU usage for monitoring
      console.log(`➕ Inserted new item with ID: ${result.insertId}`);
      
      res.status(201).json({
        success: true,
        data: { id: result.insertId, categoryId: finalCategoryId },
        message: 'Enhanced checklist item added successfully'
      });

    } else if (req.method === 'PUT') {
      console.log('✏️ PUT request to update enhanced checklist item');
      
      const { id, categoryId, categoryName, item, quantity, remarks, cost, priority, isPacked, isPurchased } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'Item ID is required' });
      }

      const updateFields = [];
      const updateValues = [];
      
      // Handle category update
      if (categoryId !== undefined) {
        updateFields.push('category_id = ?');
        updateValues.push(categoryId);
      } else if (categoryName !== undefined) {
        // Look up category ID by name
        const [catRows] = await connection.execute(
          'SELECT id FROM categories WHERE category_name = ? AND is_active = TRUE',
          [categoryName]
        );
        
        if (catRows.length > 0) {
          updateFields.push('category_id = ?');
          updateValues.push(catRows[0].id);
        }
      }
      
      if (item !== undefined) { updateFields.push('item_name = ?'); updateValues.push(item); }
      if (quantity !== undefined) { updateFields.push('quantity = ?'); updateValues.push(quantity); }
      if (remarks !== undefined) { updateFields.push('remarks = ?'); updateValues.push(remarks); }
      if (cost !== undefined) { 
        const parsedCost = cost === '' || cost === null ? 500 : parseFloat(cost);
        updateFields.push('cost = ?'); 
        updateValues.push(isNaN(parsedCost) ? 500 : parsedCost); 
      }
      if (priority !== undefined) { updateFields.push('priority = ?'); updateValues.push(priority); }
      if (isPacked !== undefined) { updateFields.push('is_packed = ?'); updateValues.push(!!isPacked); }
      if (isPurchased !== undefined) { updateFields.push('is_purchased = ?'); updateValues.push(!!isPurchased); }
      
      if (updateFields.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }
      
      updateValues.push(userId, id);
      
      // RU Optimized: Update with explicit index usage
      const updateResult = await connection.execute(
        `UPDATE checklist_items 
         USE INDEX (idx_user_category)
         SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ? AND id = ?`,
        updateValues
      );
      
      // Log RU usage for monitoring
      console.log(`📈 Updated item ${id}, affected rows: ${updateResult[0].affectedRows}`);
      
      res.status(200).json({
        success: true,
        message: 'Enhanced checklist item updated successfully'
      });

    } else if (req.method === 'DELETE') {
      console.log('🗑️ DELETE request to remove enhanced checklist item');
      
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'Item ID is required' });
      }

      // RU Optimized: Delete with explicit index usage
      const deleteResult = await connection.execute(
        `DELETE FROM checklist_items 
         USE INDEX (idx_user_category)
         WHERE user_id = ? AND id = ?`,
        [userId, id]
      );
      
      // Log RU usage and verify deletion
      console.log(`🗑️ Deleted item ${id}, affected rows: ${deleteResult[0].affectedRows}`);
      
      if (deleteResult[0].affectedRows === 0) {
        return res.status(404).json({ error: 'Item not found or already deleted' });
      }
      
      res.status(200).json({
        success: true,
        message: 'Enhanced checklist item deleted successfully'
      });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Enhanced Checklist items API error:', error);
    
    // Fallback response if TiDB is not configured
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res.status(200).json({
        success: true,
        data: req.method === 'GET' ? {} : null,
        categories: req.method === 'GET' ? {} : null,
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