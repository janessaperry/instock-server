import sql from "../db/db.js";

export const getAllWarehouses = async (_req, res) => {
  try {
    const warehousesData = await sql`
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
    return res.status(200).json(warehousesData);
  } catch (error) {
    console.error("Error getting warehouses:", error);
    return res.status(500).send("Error getting warehouses", error);
  }
};

export const getWarehouseById = async (req, res) => {
  const { warehouseId } = req.params;
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
      return res
        .status(404)
        .json({ message: `Warehouse with id ${warehouseId} not found` });
    }

    return res.status(200).json(foundWarehouse);
  } catch (error) {
    return res.status(500).send(`Error getting warehouse ${warehouseId} by id`);
  }
};

export const getWarehouseInventoryById = async (req, res) => {
  const { warehouseId } = req.params;
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
      return res
        .status(404)
        .json({ message: `Warehouse with id ${warehouseId} not found` });
    }

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

    return res.status(200).json(inventoryData);
  } catch (error) {
    console.error(
      `Error getting inventory for warehouse ${warehouseId}: ${error}`
    );
    return res.status(500).json({
      message: `Error getting inventory for warehouse ${warehouseId}`,
    });
  }
};

export const addNewWarehouse = async (req, res) => {
  const newWarehouse = req.body;
  try {
    await sql`
      INSERT INTO warehouses ${sql(newWarehouse)}
    `;

    return res
      .status(201)
      .json({ message: "New warehouse succesfully added", newWarehouse });
  } catch (error) {
    console.error(`Error adding new warehouse: ${error}`);
    return res
      .status(500)
      .json({ message: `Error adding new warehouse to database` });
  }
};

export const editExistingWarehouse = async (req, res) => {
  const { warehouseId } = req.params;
  const updatedWarehouse = req.body;
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

    let foundWarehouse = warehouseDetailsData[0] || null;

    if (!foundWarehouse) {
      return res
        .status(404)
        .json({ message: `Warehouse with id ${warehouseId} not found` });
    }

    await sql`
      UPDATE warehouses
      SET ${sql(updatedWarehouse)}
      WHERE id = ${warehouseId}
    `;

    return res.status(200).json({
      message: `Warehouse ${warehouseId} updated successfully`,
      updatedWarehouse,
    });
  } catch (error) {
    console.error(`Error updating warehouse ${warehouseId}: ${error}`);
    return res
      .status(500)
      .json({ message: `Error updating warehouse ${warehouseId}` });
  }
};

export const deleteWarehouse = async (req, res) => {
  const { warehouseId } = req.params;
  try {
    await sql`
      DELETE FROM warehouses
      WHERE id = ${warehouseId}
    `;
    return res.status(204).end();
  } catch (error) {
    console.error(`Error deleting warehouse ${warehouseId}: ${error}`);
    return res
      .status(500)
      .json({ message: `Error deleting warehouse ${warehouseId}` });
  }
};
