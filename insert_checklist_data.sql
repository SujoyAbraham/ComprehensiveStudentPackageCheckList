-- SQL INSERT statements for the hardcoded checklist data
-- Run these statements to populate the checklist_items table in TiDB

-- Clothing items
INSERT INTO checklist_items (user_id, category, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 'Clothing', 'Winter Jacket (Heavy)', '1-2', 'Essential for German winters (-10°C to 5°C)', '3000-8000', 'High', false),
('anub_abby', 'Clothing', 'Thermal Underwear', '3-4 sets', 'Base layer for winter', '1500-3000', 'High', false),
('anub_abby', 'Clothing', 'Warm Sweaters/Hoodies', '4-5', 'Wool or fleece material', '2000-5000', 'High', false),
('anub_abby', 'Clothing', 'Jeans/Trousers', '4-5', 'Regular and warm varieties', '2000-4000', 'Medium', false),
('anub_abby', 'Clothing', 'Formal Shirts', '3-4', 'For presentations and interviews', '1500-3000', 'Medium', false),
('anub_abby', 'Clothing', 'T-Shirts', '6-8', 'Cotton and synthetic blend', '1200-2400', 'Medium', false),
('anub_abby', 'Clothing', 'Undergarments', '10-12', 'Include thermal variants', '1000-2000', 'High', false),
('anub_abby', 'Clothing', 'Socks (Winter)', '8-10 pairs', 'Wool or thermal socks', '800-1500', 'High', false),
('anub_abby', 'Clothing', 'Sleepwear', '3-4 sets', 'Warm pajamas for winter', '1000-2000', 'Medium', false),
('anub_abby', 'Clothing', 'Raincoat/Windbreaker', '1', 'For frequent rain', '1500-3000', 'Medium', false);

-- Footwear items
INSERT INTO checklist_items (user_id, category, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 'Footwear', 'Winter Boots', '1 pair', 'Waterproof, for snow and rain', '3000-6000', 'High', false),
('anub_abby', 'Footwear', 'Casual Shoes', '2 pairs', 'Comfortable for daily wear', '2000-4000', 'Medium', false),
('anub_abby', 'Footwear', 'Formal Shoes', '1 pair', 'For interviews and formal events', '2000-4000', 'Medium', false),
('anub_abby', 'Footwear', 'Sports Shoes', '1 pair', 'For gym and outdoor activities', '2000-5000', 'Medium', false),
('anub_abby', 'Footwear', 'House Slippers', '1 pair', 'Indoor use', '300-800', 'Low', false),
('anub_abby', 'Footwear', 'Sandals', '1 pair', 'For summer months', '800-1500', 'Low', false);

-- Kitchen Essentials items
INSERT INTO checklist_items (user_id, category, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 'Kitchen Essentials', 'Pressure Cooker (Small)', '1', 'Essential for Indian cooking', '1500-3000', 'High', false),
('anub_abby', 'Kitchen Essentials', 'Rice Cooker', '1', 'Convenient for daily use', '2000-4000', 'Medium', false),
('anub_abby', 'Kitchen Essentials', 'Non-stick Pan Set', '2-3', 'Different sizes', '1500-3000', 'Medium', false),
('anub_abby', 'Kitchen Essentials', 'Steel Utensils Set', '1 set', 'Plates, bowls, glasses', '1000-2000', 'Medium', false),
('anub_abby', 'Kitchen Essentials', 'Knife Set', '1 set', 'Basic kitchen knives', '1000-2000', 'Medium', false),
('anub_abby', 'Kitchen Essentials', 'Spice Box (Masala Dabba)', '1', 'Traditional Indian spice container', '500-1000', 'High', false),
('anub_abby', 'Kitchen Essentials', 'Thermos/Insulated Bottles', '2', 'For hot beverages', '800-1500', 'Medium', false),
('anub_abby', 'Kitchen Essentials', 'Lunch Box', '1-2', 'For carrying meals', '500-1000', 'Medium', false),
('anub_abby', 'Kitchen Essentials', 'Cutting Board', '1', 'Wooden or plastic', '300-800', 'Low', false),
('anub_abby', 'Kitchen Essentials', 'Can Opener & Basic Tools', '1 set', 'Essential kitchen tools', '500-1000', 'Low', false);

-- Personal Care items
INSERT INTO checklist_items (user_id, category, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 'Personal Care', 'Toothbrush & Toothpaste', '2-3', 'Travel and regular size', '300-600', 'High', false),
('anub_abby', 'Personal Care', 'Shampoo & Conditioner', '2 bottles', 'Suitable for European water', '800-1500', 'Medium', false),
('anub_abby', 'Personal Care', 'Body Wash/Soap', '3-4', 'Moisturizing for dry climate', '600-1200', 'Medium', false),
('anub_abby', 'Personal Care', 'Face Wash & Moisturizer', '2 each', 'For climate change adaptation', '1000-2000', 'Medium', false),
('anub_abby', 'Personal Care', 'Sunscreen', '2 tubes', 'SPF 30+ for all seasons', '800-1500', 'Medium', false),
('anub_abby', 'Personal Care', 'Deodorant/Perfume', '2-3', 'Long-lasting varieties', '1000-2000', 'Medium', false),
('anub_abby', 'Personal Care', 'Hair Oil', '2 bottles', 'Coconut or preferred oil', '400-800', 'Medium', false),
('anub_abby', 'Personal Care', 'Nail Clippers & Grooming Kit', '1 set', 'Complete grooming tools', '500-1000', 'Low', false),
('anub_abby', 'Personal Care', 'Towels', '3-4', 'Quick-dry varieties', '1000-2000', 'Medium', false),
('anub_abby', 'Personal Care', 'Feminine Hygiene Products', '6 months supply', 'Preferred brands may not be available', '1000-2000', 'High', false);

-- Groceries & Food items
INSERT INTO checklist_items (user_id, category, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 'Groceries & Food', 'Basmati Rice', '2-3 kg', 'Good quality, vacuum packed', '600-1200', 'High', false),
('anub_abby', 'Groceries & Food', 'Dal/Lentils Variety Pack', '1-2 kg', 'Toor, moong, chana dal', '500-1000', 'High', false),
('anub_abby', 'Groceries & Food', 'Spices (Garam Masala, Turmeric, etc.)', '500g total', 'Essential Indian spices', '800-1500', 'High', false),
('anub_abby', 'Groceries & Food', 'Tea (Chai) & Coffee', '500g each', 'Preferred Indian brands', '600-1200', 'Medium', false),
('anub_abby', 'Groceries & Food', 'Pickle & Chutneys', '2-3 jars', 'Homemade or commercial', '500-1000', 'Medium', false),
('anub_abby', 'Groceries & Food', 'Papad & Dried Snacks', '500g', 'Easy to carry and store', '300-600', 'Low', false),
('anub_abby', 'Groceries & Food', 'Ghee', '500ml', 'Pure cow ghee', '400-800', 'Medium', false),
('anub_abby', 'Groceries & Food', 'Atta (Wheat Flour)', '1-2 kg', 'For making rotis', '200-400', 'Medium', false),
('anub_abby', 'Groceries & Food', 'Instant Food Items', '10-15 packets', 'Maggi, ready-to-eat meals', '800-1500', 'Low', false),
('anub_abby', 'Groceries & Food', 'Dry Fruits & Nuts', '500g', 'Almonds, dates, raisins', '1500-3000', 'Low', false);

-- Documents items
INSERT INTO checklist_items (user_id, category, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 'Documents', 'Passport', '1', 'Valid for 6+ months', '3500', 'High', false),
('anub_abby', 'Documents', 'Student Visa', '1', 'Germany student visa', '7500', 'High', false),
('anub_abby', 'Documents', 'Admission Letter', 'Original + 3 copies', 'University admission letter', '0', 'High', false),
('anub_abby', 'Documents', 'Academic Transcripts', 'Original + 5 copies', 'All previous education', '500', 'High', false),
('anub_abby', 'Documents', 'Degree Certificates', 'Original + 5 copies', 'Attested copies', '1000', 'High', false),
('anub_abby', 'Documents', 'Medical Certificates', 'Original + 2 copies', 'Health checkup, vaccinations', '2000', 'High', false),
('anub_abby', 'Documents', 'Financial Documents', 'Original + 3 copies', 'Bank statements, scholarship letters', '200', 'High', false),
('anub_abby', 'Documents', 'Insurance Documents', 'Original + 2 copies', 'Health and travel insurance', '15000', 'High', false),
('anub_abby', 'Documents', 'Photographs', '20', 'Passport size, recent', '200', 'Medium', false),
('anub_abby', 'Documents', 'Character Certificate', 'Original + 2 copies', 'Police verification', '500', 'Medium', false),
('anub_abby', 'Documents', 'Birth Certificate', 'Original + 2 copies', 'Attested copy', '100', 'Low', false),
('anub_abby', 'Documents', 'Driving License', 'Original + 2 copies', 'International driving permit', '1000', 'Low', false);

-- Electronics items
INSERT INTO checklist_items (user_id, category, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 'Electronics', 'Laptop', '1', 'Study-appropriate specs', '40000-80000', 'High', false),
('anub_abby', 'Electronics', 'Smartphone', '1', 'Unlocked, compatible with German networks', '15000-40000', 'High', false),
('anub_abby', 'Electronics', 'Universal Power Adapter', '2', 'Type C & F for Germany', '1000-2000', 'High', false),
('anub_abby', 'Electronics', 'Power Bank', '1-2', 'High capacity (10000mAh+)', '1500-3000', 'Medium', false),
('anub_abby', 'Electronics', 'Laptop Charger (Extra)', '1', 'Backup charger', '2000-4000', 'Medium', false),
('anub_abby', 'Electronics', 'Phone Charger & Cables', '2 sets', 'USB-C, Lightning as needed', '800-1500', 'Medium', false),
('anub_abby', 'Electronics', 'Headphones/Earphones', '1 pair', 'Good quality for online classes', '1500-5000', 'Medium', false),
('anub_abby', 'Electronics', 'External Hard Drive', '1', '1TB for backups', '3000-5000', 'Medium', false),
('anub_abby', 'Electronics', 'Webcam (if laptop doesn''t have good one)', '1', 'For video calls and classes', '2000-4000', 'Low', false),
('anub_abby', 'Electronics', 'Extension Cord', '1', 'Multi-socket with surge protection', '800-1500', 'Low', false);

-- Medicines items
INSERT INTO checklist_items (user_id, category, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 'Medicines', 'Fever & Pain Relief', '2 strips', 'Paracetamol, Ibuprofen', '200-400', 'High', false),
('anub_abby', 'Medicines', 'Cold & Cough Medicine', '2 bottles', 'Syrup and tablets', '300-600', 'High', false),
('anub_abby', 'Medicines', 'Stomach Upset Medicine', '2 strips', 'Antacid, ORS packets', '200-400', 'High', false),
('anub_abby', 'Medicines', 'Antiseptic Cream', '2 tubes', 'For cuts and wounds', '200-400', 'Medium', false),
('anub_abby', 'Medicines', 'Band-aids & Gauze', '1 pack each', 'First aid essentials', '200-400', 'Medium', false),
('anub_abby', 'Medicines', 'Prescription Medicines', '3 months supply', 'Any ongoing medications', '1000-5000', 'High', false),
('anub_abby', 'Medicines', 'Vitamin Supplements', '2 bottles', 'Vitamin D, B12 for European climate', '800-1500', 'Medium', false),
('anub_abby', 'Medicines', 'Eye Drops', '2 bottles', 'For dry eyes from screen time', '300-600', 'Low', false),
('anub_abby', 'Medicines', 'Thermometer', '1', 'Digital thermometer', '300-600', 'Medium', false),
('anub_abby', 'Medicines', 'Hot Water Bag', '1', 'For winter aches', '300-600', 'Low', false);

-- Banking & Cards items
INSERT INTO checklist_items (user_id, category, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 'Banking & Cards', 'International Debit Card', '1', 'Forex-enabled, low charges', '500', 'High', false),
('anub_abby', 'Banking & Cards', 'Credit Card', '1', 'International usage enabled', '500', 'High', false),
('anub_abby', 'Banking & Cards', 'Forex Card', '1', 'Pre-loaded EUR card', '200', 'Medium', false),
('anub_abby', 'Banking & Cards', 'Cash (EUR)', '500-1000 EUR', 'For initial expenses', '45000-90000', 'High', false),
('anub_abby', 'Banking & Cards', 'Cash (INR)', '10000-20000', 'For last-minute expenses in India', '10000-20000', 'Medium', false),
('anub_abby', 'Banking & Cards', 'Bank Account Documents', '1 set', 'For opening German bank account', '0', 'High', false),
('anub_abby', 'Banking & Cards', 'Financial Backup Plan', '1', 'Emergency fund access method', '0', 'Medium', false);

-- Stationery & Academic items
INSERT INTO checklist_items (user_id, category, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 'Stationery & Academic', 'Notebooks', '5-10', 'A4 size, ruled and plain', '500-1000', 'Medium', false),
('anub_abby', 'Stationery & Academic', 'Pens & Pencils', '10 each', 'Blue, black pens + mechanical pencils', '300-600', 'Medium', false),
('anub_abby', 'Stationery & Academic', 'Highlighters', '5', 'Different colors', '200-400', 'Low', false),
('anub_abby', 'Stationery & Academic', 'Stapler & Staples', '1 set', 'For document organization', '200-400', 'Low', false),
('anub_abby', 'Stationery & Academic', 'Folders & Files', '10', 'For document storage', '300-600', 'Medium', false),
('anub_abby', 'Stationery & Academic', 'Calculator', '1', 'Scientific calculator', '500-1500', 'Medium', false),
('anub_abby', 'Stationery & Academic', 'Ruler & Geometry Set', '1 set', 'For technical drawings', '200-400', 'Low', false),
('anub_abby', 'Stationery & Academic', 'Sticky Notes', '5 packs', 'For study organization', '200-400', 'Low', false),
('anub_abby', 'Stationery & Academic', 'Backpack', '1', 'Laptop compartment, weather-resistant', '1500-3000', 'High', false),
('anub_abby', 'Stationery & Academic', 'Study Lamp', '1', 'LED desk lamp', '800-1500', 'Low', false);

-- Miscellaneous items
INSERT INTO checklist_items (user_id, category, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 'Miscellaneous', 'Umbrella', '1', 'Compact, sturdy for frequent rain', '500-1000', 'Medium', false),
('anub_abby', 'Miscellaneous', 'Travel Pillow', '1', 'For comfortable journey', '800-1500', 'Low', false),
('anub_abby', 'Miscellaneous', 'Luggage Locks', '2-3', 'TSA-approved locks', '600-1200', 'Medium', false),
('anub_abby', 'Miscellaneous', 'Sewing Kit', '1', 'Basic repairs', '200-400', 'Low', false),
('anub_abby', 'Miscellaneous', 'Indian Flag Pin', '2', 'Cultural representation', '100-200', 'Low', false),
('anub_abby', 'Miscellaneous', 'Emergency Contact List', '3 copies', 'Laminated, important numbers', '100', 'High', false),
('anub_abby', 'Miscellaneous', 'Mattress Protector', '1', 'For dorm bed', '800-1500', 'Low', false),
('anub_abby', 'Miscellaneous', 'Alarm Clock', '1', 'Backup to phone', '500-1000', 'Low', false),
('anub_abby', 'Miscellaneous', 'Padlock', '2', 'For lockers and storage', '400-800', 'Medium', false),
('anub_abby', 'Miscellaneous', 'European SIM Card', '1', 'Pre-ordered or upon arrival', '1000-2000', 'High', false);