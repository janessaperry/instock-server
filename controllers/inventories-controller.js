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
    console.error(`Error getting inventories: ${error.message}`, error);
    return res.status(500).json({
      message: "Error getting inventory data.",
    });
  }
};

export const deleteInventoryById = async (req, res) => {
  try {
    const { inventoryId } = req.params;
    const inventoryItem = await sql`
      SELECT * FROM inventories
      WHERE id = ${inventoryId}
    `;

    let foundInventoryItem = inventoryItem[0] || null;

    if (!foundInventoryItem) {
      return res
        .status(404)
        .json({ message: `Inventory item with id ${inventoryId} not found` });
    }

    await sql`
    DELETE FROM inventories
    WHERE id = ${inventoryId}
  `;

    return res.status(204).end();
  } catch (error) {
    console.error(`Error deleting inventory item: ${error.message}`, error);
    return res
      .status(500)
      .json({ message: "Error deleting inventory item by id." });
  }
};
