# Furniture Management Application

Furniture management application for artisan designers.

[Project instructions](https://github.com/Brasero/fsd58-59-node-s3/blob/master/sujet.md)

## Architecture

- **Frontend**: React TypeScript (port 3000)
- **Backend**: Express.js (port 5000)
- **Database**: MariaDB with MySQL
- **Authentication**: JWT
- **Charts**: Chart.js

## Project Structure

```
/
├── client/          # React TypeScript Frontend
├── server/          # Express.js Backend
├── shared/          # Shared types and utilities
├── docs/            # Documentation
└── package.json     # Workspace configuration
```

## Entities

- **Furniture**: Wardrobe, Shelf
- **Materials**: Wood (ash, oak, walnut), Metal (stainless steel, aluminum), Plastic
- **Suppliers**: BBois, MetaLo, pPlastique

## Installation and usage

```bash
npm install
npm run dev
npm run build
```
