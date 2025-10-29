# Database Schema - Furniture Management

## Overview

This application uses MySQL with Sequelize ORM to manage data for furniture, materials, and suppliers.

## Tables

### 1. users

```sql
CREATE TABLE user (
    identifier INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. suppliers

```sql
CREATE TABLE supplier (
    identifier INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL, -- BBois, MetaLo, pPlastique
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    contact_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3. materials

```sql
CREATE TABLE material (
    identifier INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL, -- ash, oak, walnut, stainless steel, aluminum, plastic
    category ENUM('wood', 'metal', 'plastic') NOT NULL,
    supplier_id INT NOT NULL,
    color VARCHAR(50),
    density DECIMAL(8,2),
    price DECIMAL(10,2),
    unit VARCHAR(20), -- m3, kg, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE RESTRICT
);
```

### 4. furniture

```sql
CREATE TABLE furniture (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category ENUM('wardrobe', 'shelf') NOT NULL,
    description TEXT,
    image_url TEXT DEFAULT NULL,
    width DECIMAL(8,2),
    height DECIMAL(8,2),
    depth DECIMAL(8,2),
    dimension_unit VARCHAR(10) DEFAULT 'cm',
    status ENUM('design', 'production', 'finished') DEFAULT 'design',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 5. furniture_materials (Furniture-Materials Join Table)

```sql
CREATE TABLE furniture_material (
    id INT PRIMARY KEY AUTO_INCREMENT,
    furniture_id INT NOT NULL,
    material_id INT NOT NULL,
    quantity DECIMAL(10,3) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (furniture_id) REFERENCES furniture(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE RESTRICT,
    UNIQUE KEY unique_furniture_material (furniture_id, material_id)
);
```

## Relationships

1. **suppliers → materials** (1:N)

   - A supplier can provide multiple materials
   - Each material has a single supplier
   - Foreign key: `materials.supplier_id`

2. **furniture ↔ materials** (N:M)

   - A piece of furniture can use multiple materials
   - A material can be used in multiple pieces of furniture
   - Join table: `furniture_materials`

## Initial Data

### Suppliers

- BBois (Wood): ash, oak, walnut
- MetaLo (Metals): stainless steel, aluminum
- pPlastique (Plastic): plastic

### Furniture Categories

- Wardrobe
- Shelf
