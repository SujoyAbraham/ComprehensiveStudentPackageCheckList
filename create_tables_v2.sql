-- Enhanced Table creation SQL statements for TiDB with Meta Categories
-- Run these statements to create the required tables with category management

-- Create categories meta table
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    category_icon VARCHAR(10) DEFAULT '📋',
    description TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_display_order (display_order),
    INDEX idx_active (is_active)
) ENGINE=InnoDB;

-- Create user_data table for user information and legacy data
CREATE TABLE IF NOT EXISTS user_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(50) DEFAULT 'anub_abby',
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    progress_data JSON,
    custom_items JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user (user_id)
) ENGINE=InnoDB;

-- Create enhanced checklist_items table with foreign key to categories
CREATE TABLE IF NOT EXISTS checklist_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(50) DEFAULT 'anub_abby',
    category_id INT NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    quantity VARCHAR(100) DEFAULT '1',
    remarks TEXT,
    cost DECIMAL(10,2) DEFAULT 500.00,
    priority ENUM('High', 'Medium', 'Low') DEFAULT 'Medium',
    is_custom BOOLEAN DEFAULT FALSE,
    is_packed BOOLEAN DEFAULT FALSE,
    is_purchased BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_category (user_id, category_id),
    INDEX idx_priority (priority),
    INDEX idx_status (is_packed, is_purchased),
    INDEX idx_cost (cost),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Insert default categories with icons and proper ordering
INSERT INTO categories (category_name, category_icon, description, display_order) VALUES
('Essential Documents', '📄', 'Important documents required for travel and studies', 1),
('Electronics', '🔌', 'Electronic devices and accessories', 2),
('Clothing', '👔', 'Clothing items for all seasons', 3),
('Footwear', '👟', 'Shoes and boots for different occasions', 4),
('Personal Care', '🧴', 'Personal hygiene and care items', 5),
('Academic Materials', '📚', 'Books, stationery and study materials', 6),
('Kitchen Items', '🍳', 'Cooking utensils and kitchen essentials', 7),
('Medical & Health', '💊', 'Medicines and health-related items', 8),
('Financial', '💰', 'Banking and financial documents', 9),
('Miscellaneous', '📦', 'Other important items', 10),
('Custom Items', '📝', 'User-defined personalized items', 11);