-- Table users
CREATE TABLE IF NOT EXISTS user (
  identifier VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table suppliers
CREATE TABLE IF NOT EXISTS supplier (
  identifier VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  contact_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table materials
CREATE TABLE IF NOT EXISTS material (
  identifier VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category ENUM('bois', 'fer', 'plastique') NOT NULL,
  supplier_id VARCHAR(36) NOT NULL,
  color VARCHAR(50),
  density DECIMAL(8,2),
  price DECIMAL(10,2),
  unit VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (supplier_id) REFERENCES supplier(identifier) ON DELETE RESTRICT,
  INDEX idx_materials_category (category),
  INDEX idx_materials_supplier (supplier_id)
);

-- Table furniture
CREATE TABLE IF NOT EXISTS furniture (
  identifier VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category ENUM('armoire', 'étagère') NOT NULL,
  description TEXT,
  image_url TEXT DEFAULT NULL,
  width DECIMAL(8,2),
  height DECIMAL(8,2),
  depth DECIMAL(8,2),
  dimension_unit VARCHAR(10) DEFAULT 'cm',
  status ENUM('conception', 'production', 'terminé') DEFAULT 'conception',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_furniture_category (category),
  INDEX idx_furniture_status (status)
);

-- Table furniture_materials
CREATE TABLE IF NOT EXISTS furniture_material (
  identifier VARCHAR(36) PRIMARY KEY,
  furniture_id VARCHAR(36) NOT NULL,
  material_id VARCHAR(36) NOT NULL,
  quantity DECIMAL(10,3) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (furniture_id) REFERENCES furniture(identifier) ON DELETE CASCADE,
  FOREIGN KEY (material_id) REFERENCES material(identifier) ON DELETE CASCADE
);