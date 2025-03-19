import sql from "../db/db.js";
import { NotFoundError, DatabaseError } from "../utils/errors.js";

export class Warehouses {
  static async findAll() {
    try {
      return await sql`
        SELECT 
          id, 
          warehouse_name, 
          address, 
          city, 
          country, 
          contact_name, 
          contact_position, 
          contact_phone, 
          contact_email
        FROM warehouses
        ORDER BY id
      `;
    } catch (error) {
      throw new DatabaseError(`Error fetching warehouses.`);
    }
  }

  static async findById(warehouseId) {
    try {
      const warehouseDetailsData = await sql`
        SELECT 
          id,
          warehouse_name,
          address,
          city,
          country,
          contact_name,
          contact_position,
          contact_phone,
          contact_email
        FROM warehouses
        WHERE id = ${warehouseId}
        LIMIT 1
      `;

      let foundWarehouse = warehouseDetailsData[0];
      if (!foundWarehouse) {
        throw new NotFoundError(`Warehouse ${warehouseId} not found.`);
      }

      return foundWarehouse;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(`Error fetching warehouses ${warehouseId}.`);
    }
  }

  static async getInventory(warehouseId) {
    try {
      await this.findById(warehouseId);
      const inventoryData = await sql`
        SELECT 
          id,
          item_name,
          category,
          status,
          quantity
        FROM inventories
        WHERE warehouse_id = ${warehouseId}
      `;

      return inventoryData;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(
        `Error getting inventory for warehouse ${warehouseId}.`
      );
    }
  }

  static async create(warehouseData) {
    try {
      return await sql`
        INSERT INTO warehouses ${sql(warehouseData)} 
      `;
    } catch (error) {
      throw new DatabaseError(`Error adding new warehouse to database.`);
    }
  }

  static async update(warehouseId, warehouseData) {
    try {
      await this.findById(warehouseId);
      await sql`
        UPDATE warehouses
        SET ${sql(warehouseData)}
        WHERE id = ${warehouseId}
      `;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(`Error updating warehouse ${warehouseId}.`);
    }
  }

  static async delete(warehouseId) {
    try {
      await this.findById(warehouseId);
      await sql`
        DELETE FROM warehouses
        WHERE id = ${warehouseId}
      `;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(`Error deleting warehouse ${warehouseId}.`);
    }
  }
}
