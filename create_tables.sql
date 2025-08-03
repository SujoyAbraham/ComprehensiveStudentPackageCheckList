-- Table creation SQL statements for TiDB
-- Run these statements to create the required tables

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

-- Create checklist_items table for individual checklist items
CREATE TABLE IF NOT EXISTS checklist_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(50) DEFAULT 'anub_abby',
    category VARCHAR(100) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    quantity VARCHAR(100),
    remarks TEXT,
    cost VARCHAR(100),
    priority ENUM('High', 'Medium', 'Low') DEFAULT 'Medium',
    is_custom BOOLEAN DEFAULT FALSE,
    is_packed BOOLEAN DEFAULT FALSE,
    is_purchased BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_category (user_id, category),
    INDEX idx_priority (priority),
    INDEX idx_status (is_packed, is_purchased)
) ENGINE=InnoDB;