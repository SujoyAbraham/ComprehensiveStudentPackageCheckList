-- Enhanced SQL INSERT statements for the hardcoded checklist data
-- Run these statements to populate the checklist_items table in TiDB with category references
-- All items have a default cost of 500 INR as requested by user

-- Essential Documents (category_id = 1)
INSERT INTO checklist_items (user_id, category_id, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 1, 'Passport', '1', 'Valid for at least 6 months', 500, 'High', false),
('anub_abby', 1, 'Visa Documents', '1 set', 'Student visa and related papers', 500, 'High', false),
('anub_abby', 1, 'University Admission Letter', '2 copies', 'Original and photocopy', 500, 'High', false),
('anub_abby', 1, 'Academic Transcripts', '3 copies', 'Sealed and attested', 500, 'High', false),
('anub_abby', 1, 'Degree Certificate', '3 copies', 'Original and photocopies', 500, 'High', false),
('anub_abby', 1, 'IELTS/TOEFL Certificate', '2 copies', 'English proficiency proof', 500, 'High', false),
('anub_abby', 1, 'Financial Documents', '1 set', 'Bank statements, scholarship letters', 500, 'High', false),
('anub_abby', 1, 'Health Insurance', '1', 'Valid in Germany', 500, 'High', false),
('anub_abby', 1, 'Flight Tickets', '1', 'Confirmed booking', 500, 'High', false),
('anub_abby', 1, 'Accommodation Proof', '1', 'Hostel/rental agreement', 500, 'High', false),
('anub_abby', 1, 'Passport Photos', '10-15', 'Standard size (3.5x4.5 cm)', 500, 'Medium', false),
('anub_abby', 1, 'Birth Certificate', '2 copies', 'Attested copies', 500, 'Medium', false),
('anub_abby', 1, 'Police Clearance Certificate', '1', 'Required for visa', 500, 'Medium', false),
('anub_abby', 1, 'Medical Certificate', '1', 'Health fitness certificate', 500, 'Medium', false);

-- Electronics (category_id = 2)
INSERT INTO checklist_items (user_id, category_id, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 2, 'Laptop', '1', 'For studies and work', 500, 'High', false),
('anub_abby', 2, 'Laptop Charger', '1', 'Original charger', 500, 'High', false),
('anub_abby', 2, 'External Hard Drive', '1', 'For backup (1TB minimum)', 500, 'High', false),
('anub_abby', 2, 'Phone', '1', 'Unlocked for international use', 500, 'High', false),
('anub_abby', 2, 'Phone Charger', '1', 'Fast charging cable', 500, 'High', false),
('anub_abby', 2, 'Power Bank', '1', '10000mAh or higher', 500, 'Medium', false),
('anub_abby', 2, 'Universal Adapter', '1', 'EU plug compatible', 500, 'High', false),
('anub_abby', 2, 'Extension Cord', '1', 'With multiple sockets', 500, 'Medium', false),
('anub_abby', 2, 'Headphones/Earphones', '1 pair', 'Good quality for calls', 500, 'Medium', false),
('anub_abby', 2, 'USB Cables', '2-3', 'Type-C, Micro USB, Lightning', 500, 'Medium', false),
('anub_abby', 2, 'Tablet (Optional)', '1', 'For reading and notes', 500, 'Low', false),
('anub_abby', 2, 'Camera', '1', 'For memories and projects', 500, 'Low', false),
('anub_abby', 2, 'Ethernet Cable', '1', 'For stable internet', 500, 'Low', false);

-- Clothing (category_id = 3)
INSERT INTO checklist_items (user_id, category_id, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 3, 'Winter Jacket (Heavy)', '1-2', 'Essential for German winters (-10°C to 5°C)', 500, 'High', false),
('anub_abby', 3, 'Thermal Underwear', '3-4 sets', 'Base layer for winter', 500, 'High', false),
('anub_abby', 3, 'Warm Sweaters/Hoodies', '4-5', 'Wool or fleece material', 500, 'High', false),
('anub_abby', 3, 'Jeans/Trousers', '4-5', 'Regular and warm varieties', 500, 'Medium', false),
('anub_abby', 3, 'Formal Shirts', '3-4', 'For presentations and interviews', 500, 'Medium', false),
('anub_abby', 3, 'T-Shirts', '6-8', 'Cotton and synthetic blend', 500, 'Medium', false),
('anub_abby', 3, 'Undergarments', '10-12', 'Include thermal variants', 500, 'High', false),
('anub_abby', 3, 'Socks (Winter)', '8-10 pairs', 'Wool or thermal socks', 500, 'High', false),
('anub_abby', 3, 'Sleepwear', '3-4 sets', 'Warm pajamas for winter', 500, 'Medium', false),
('anub_abby', 3, 'Raincoat/Windbreaker', '1', 'For frequent rain', 500, 'Medium', false),
('anub_abby', 3, 'Gloves', '2 pairs', 'Winter gloves', 500, 'High', false),
('anub_abby', 3, 'Scarves', '2-3', 'Warm scarves', 500, 'Medium', false),
('anub_abby', 3, 'Beanie/Winter Hat', '2', 'Warm headwear', 500, 'Medium', false),
('anub_abby', 3, 'Formal Suit', '1', 'For important events', 500, 'Low', false);

-- Footwear (category_id = 4)
INSERT INTO checklist_items (user_id, category_id, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 4, 'Winter Boots', '1 pair', 'Waterproof, for snow and rain', 500, 'High', false),
('anub_abby', 4, 'Casual Shoes', '2 pairs', 'Comfortable for daily wear', 500, 'Medium', false),
('anub_abby', 4, 'Formal Shoes', '1 pair', 'For interviews and formal events', 500, 'Medium', false),
('anub_abby', 4, 'Sports Shoes', '1 pair', 'For gym and outdoor activities', 500, 'Medium', false),
('anub_abby', 4, 'Slippers/Flip-flops', '1 pair', 'For hostel/home use', 500, 'Low', false),
('anub_abby', 4, 'Shoe Insoles', '2-3 pairs', 'Extra comfort and warmth', 500, 'Low', false);

-- Personal Care (category_id = 5)
INSERT INTO checklist_items (user_id, category_id, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 5, 'Shampoo & Conditioner', '1 set', 'Travel size initially', 500, 'Medium', false),
('anub_abby', 5, 'Toothbrush & Toothpaste', '1 set', 'Good quality', 500, 'High', false),
('anub_abby', 5, 'Soap/Body Wash', '1', 'Travel size', 500, 'Medium', false),
('anub_abby', 5, 'Deodorant', '1-2', 'Long-lasting', 500, 'Medium', false),
('anub_abby', 5, 'Razor & Shaving Cream', '1 set', 'For men', 500, 'Medium', false),
('anub_abby', 5, 'Face Wash', '1', 'Suitable for your skin type', 500, 'Medium', false),
('anub_abby', 5, 'Moisturizer', '1', 'For dry winter skin', 500, 'Medium', false),
('anub_abby', 5, 'Sunscreen', '1', 'SPF 30+', 500, 'Low', false),
('anub_abby', 5, 'Hair Oil', '1 small bottle', 'Indian hair oil', 500, 'Low', false),
('anub_abby', 5, 'Nail Cutter', '1', 'Good quality', 500, 'Low', false),
('anub_abby', 5, 'Towels', '2-3', 'Quick-dry material', 500, 'Medium', false),
('anub_abby', 5, 'Tissues & Wet Wipes', '2-3 packs', 'For travel and daily use', 500, 'Low', false);

-- Academic Materials (category_id = 6)
INSERT INTO checklist_items (user_id, category_id, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 6, 'Notebooks', '4-5', 'A4 size, ruled', 500, 'Medium', false),
('anub_abby', 6, 'Pens', '10-15', 'Blue and black', 500, 'Medium', false),
('anub_abby', 6, 'Pencils', '5-10', 'HB and 2B', 500, 'Medium', false),
('anub_abby', 6, 'Highlighters', '4-5', 'Different colors', 500, 'Medium', false),
('anub_abby', 6, 'Sticky Notes', '5-6 pads', 'Different sizes', 500, 'Low', false),
('anub_abby', 6, 'Stapler & Staples', '1 set', 'Small size', 500, 'Low', false),
('anub_abby', 6, 'Paper Clips', '1 box', 'Various sizes', 500, 'Low', false),
('anub_abby', 6, 'Rubber/Eraser', '3-4', 'Good quality', 500, 'Low', false),
('anub_abby', 6, 'Ruler', '1', '30cm scale', 500, 'Low', false),
('anub_abby', 6, 'Calculator', '1', 'Scientific calculator', 500, 'Medium', false),
('anub_abby', 6, 'File Folders', '5-6', 'For organizing documents', 500, 'Medium', false),
('anub_abby', 6, 'Backpack', '1', 'Laptop-friendly', 500, 'High', false),
('anub_abby', 6, 'Reference Books', '2-3', 'Subject-specific', 500, 'Low', false);

-- Kitchen Items (category_id = 7)
INSERT INTO checklist_items (user_id, category_id, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 7, 'Pressure Cooker (Small)', '1', '1.5-2 liter capacity', 500, 'High', false),
('anub_abby', 7, 'Non-stick Pan', '1', 'Medium size', 500, 'High', false),
('anub_abby', 7, 'Cooking Pot', '1', 'With lid', 500, 'Medium', false),
('anub_abby', 7, 'Plates', '2-3', 'Unbreakable material', 500, 'Medium', false),
('anub_abby', 7, 'Bowls', '2-3', 'For cereal and soup', 500, 'Medium', false),
('anub_abby', 7, 'Spoons & Forks', '4-5 sets', 'Stainless steel', 500, 'Medium', false),
('anub_abby', 7, 'Knives', '2', 'Kitchen knives (small)', 500, 'Medium', false),
('anub_abby', 7, 'Cutting Board', '1', 'Plastic, small size', 500, 'Medium', false),
('anub_abby', 7, 'Can Opener', '1', 'Manual type', 500, 'Low', false),
('anub_abby', 7, 'Tupperware/Containers', '4-5', 'For food storage', 500, 'Medium', false),
('anub_abby', 7, 'Thermos/Water Bottle', '1', 'Insulated', 500, 'Medium', false),
('anub_abby', 7, 'Indian Spices', '1 kit', 'Basic spices in small quantities', 500, 'High', false),
('anub_abby', 7, 'Rice', '1 kg', 'Basmati rice', 500, 'Medium', false),
('anub_abby', 7, 'Instant Food Items', '5-6 packets', 'Maggi, ready-to-eat meals', 500, 'Low', false);

-- Medical & Health (category_id = 8)
INSERT INTO checklist_items (user_id, category_id, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 8, 'Prescription Medicines', 'As needed', 'With prescription copies', 500, 'High', false),
('anub_abby', 8, 'First Aid Kit', '1', 'Basic first aid supplies', 500, 'High', false),
('anub_abby', 8, 'Paracetamol/Aspirin', '1 strip', 'For fever and pain', 500, 'High', false),
('anub_abby', 8, 'Antacid', '1 bottle', 'For stomach issues', 500, 'Medium', false),
('anub_abby', 8, 'Cough Syrup', '1 bottle', 'For cold and cough', 500, 'Medium', false),
('anub_abby', 8, 'Band-aids', '1 box', 'Various sizes', 500, 'Medium', false),
('anub_abby', 8, 'Antiseptic Cream', '1 tube', 'For cuts and wounds', 500, 'Medium', false),
('anub_abby', 8, 'Thermometer', '1', 'Digital thermometer', 500, 'Medium', false),
('anub_abby', 8, 'Vitamins/Supplements', '1-2 bottles', 'Vitamin D, C, etc.', 500, 'Low', false),
('anub_abby', 8, 'Glasses/Contact Lenses', '1 set', 'With prescription', 500, 'High', false),
('anub_abby', 8, 'Medical Reports', '1 file', 'Recent health checkup reports', 500, 'Medium', false);

-- Financial (category_id = 9)
INSERT INTO checklist_items (user_id, category_id, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 9, 'Bank Cards', '2-3', 'Debit/Credit cards for international use', 500, 'High', false),
('anub_abby', 9, 'Cash (EUR)', '500-1000', 'Initial emergency cash', 500, 'High', false),
('anub_abby', 9, 'Cash (INR)', '5000-10000', 'For airport and emergencies', 500, 'Medium', false),
('anub_abby', 9, 'Bank Statements', '6 months', 'Recent statements', 500, 'High', false),
('anub_abby', 9, 'Forex Card', '1', 'Preloaded travel card', 500, 'High', false),
('anub_abby', 9, 'Income Tax Returns', '2 years', 'For visa purposes', 500, 'Medium', false),
('anub_abby', 9, 'Scholarship Documents', '1 set', 'If applicable', 500, 'Medium', false),
('anub_abby', 9, 'Education Loan Papers', '1 set', 'If applicable', 500, 'Medium', false);

-- Miscellaneous (category_id = 10)
INSERT INTO checklist_items (user_id, category_id, item_name, quantity, remarks, cost, priority, is_custom) VALUES
('anub_abby', 10, 'Umbrella', '1', 'Compact, wind-resistant', 500, 'Medium', false),
('anub_abby', 10, 'Sewing Kit', '1', 'Basic needles and thread', 500, 'Low', false),
('anub_abby', 10, 'Safety Pins', '1 pack', 'Various sizes', 500, 'Low', false),
('anub_abby', 10, 'Duct Tape', '1 roll', 'Small roll for repairs', 500, 'Low', false),
('anub_abby', 10, 'Locks', '2-3', 'For luggage and hostel', 500, 'Medium', false),
('anub_abby', 10, 'Luggage Tags', '4-5', 'With contact information', 500, 'Low', false),
('anub_abby', 10, 'Plastic Bags', '10-15', 'Zip-lock bags for organization', 500, 'Low', false),
('anub_abby', 10, 'Indian Gifts', '5-10', 'Small gifts for new friends', 500, 'Low', false),
('anub_abby', 10, 'Photos of Family', '10-15', 'Physical photos', 500, 'Low', false),
('anub_abby', 10, 'Diary/Journal', '1', 'For personal writing', 500, 'Low', false),
('anub_abby', 10, 'Phone Holder/Stand', '1', 'For video calls', 500, 'Low', false),
('anub_abby', 10, 'Travel Pillow', '1', 'For long flights', 500, 'Low', false),
('anub_abby', 10, 'Eye Mask & Ear Plugs', '1 set', 'For better sleep', 500, 'Low', false),
('anub_abby', 10, 'Compression Bags', '2-3', 'To save luggage space', 500, 'Medium', false),
('anub_abby', 10, 'Weighing Scale (Luggage)', '1', 'Portable luggage scale', 500, 'Low', false);