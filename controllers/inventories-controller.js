import sql from "../db/db.js";

export const getAllInventories = async (_req, res) => {
  try {
    const inventoriesData = await sql`
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
    return res.status(200).json(inventoriesData);
  } catch (error) {
    console.error(`Error getting inventories: ${error}`);
    res.status(500).send("Error getting inventories");
  }
};
