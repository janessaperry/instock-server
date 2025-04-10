# InStock Server

A RESTful API server for managing warehouse and inventory data built with Express.js and PostgreSQL.

> **Note:** This is a personal rebuild of a group project originally completed during my BrainStation bootcamp. I've recreated it independently to gain comprehensive understanding of the full-stack development process and strengthen my skills.

👉🏻 **[InStock Client Repository](https://github.com/janessaperry/instock-client)**

## Features

- Warehouse management (CRUD operations)
- Inventory management (CRUD operations)
- Data validation and error handling
- PostgreSQL database integration
- API endpoints for warehouses and inventories

## API Endpoints

Warehouses

- GET /warehouses: Get all warehouses
- GET /warehouses/:warehouseId: Get warehouse by ID
- GET /warehouses/:warehouseId/inventories: Get warehouse inventory
- POST /warehouses/add: Add new warehouse
- PUT /warehouses/:warehouseId/edit: Update warehouse
- DELETE /warehouses/:warehouseId: Delete warehouse

Inventories

- GET /inventories: Get all inventory items
- GET /inventories/:inventoryId: Get inventory item by ID
- POST /inventories/add: Add new inventory item
- PUT /inventories/:inventoryId/edit: Update inventory item
- DELETE /inventories/:inventoryId: Delete inventory item

## Tech Stack

[![My Skills](https://skillicons.dev/icons?i=nodejs,express,postgres,supabase)](https://skillicons.dev)
