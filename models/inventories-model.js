import sql from "../db/index.js";
import { Warehouses } from "./warehouses-model.js";
import {
  ValidationError,
  NotFoundError,
  DatabaseError,
} from "../utils/errors.js";

export class Inventories {
  static async getAll() {
    try {
      return await sql`
        SELECT
          inventories.id,
          warehouses.warehouse_name,
          inventories.item_name,
          inventories.description,
          inventories.category,
          inventories.status,
          inventories.quantity
        FROM inventories
        INNER JOIN warehouses ON inventories.warehouse_id=warehouses.id
        ORDER BY id
      `;
    } catch (error) {
      throw new DatabaseError(`Error getting inventory data: ${error.message}`);
    }
  }

  static async getById(inventoryId) {
    try {
      const inventoryItem = await sql`
        SELECT
          inventories.id,
          warehouses.warehouse_name,
          inventories.item_name,
          inventories.description,
          inventories.category,
          inventories.status,
          inventories.quantity
        FROM inventories
        INNER JOIN warehouses ON inventories.warehouse_id=warehouses.id
        WHERE inventories.id = ${inventoryId}
      `;

      let foundInventoryItem = inventoryItem[0];
      if (!foundInventoryItem) {
        throw new NotFoundError(`Inventory item ${inventoryId} not found.`);
      }

      return foundInventoryItem;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(
        `Error fetching inventory item ${inventoryId}: ${error.message}`
      );
    }
  }

  static async create(inventoryItemData) {
    try {
      await this.validateWarehouseId(inventoryItemData.warehouse_id);
      return await sql`
        INSERT INTO inventories ${sql(inventoryItemData)}
      `;
    } catch (error) {
      if (error instanceof ValidationError) throw error;

      throw new DatabaseError(
        `Error adding new inventory item to database: ${error.message}`
      );
    }
  }

  static async update(inventoryId, inventoryItemData) {
    try {
      await this.validateWarehouseId(inventoryItemData.warehouse_id);
      await this.getById(inventoryId);
      await sql`
        UPDATE inventories
        SET ${sql(inventoryItemData)}
        WHERE ID = ${inventoryId}
      `;
    } catch (error) {
      throw new DatabaseError(
        `Error updating inventory item: ${error.message}`
      );
    }
  }

  static async delete(inventoryId) {
    try {
      await this.getById(inventoryId);
      await sql`
        DELETE FROM inventories
        WHERE id = ${inventoryId}
      `;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new DatabaseError(
        `Error deleting inventory item ${inventoryId}: ${error.message}`
      );
    }
  }

  static async validateWarehouseId(warehouseId) {
    try {
      await Warehouses.getById(warehouseId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new ValidationError(
          `Failed to validate warehouse id ${warehouseId}`
        );
      }
      throw error;
    }
  }
}
