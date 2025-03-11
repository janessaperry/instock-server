import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

export const getAllWarehouses = async (_req, res) => {
  try {
    const warehousesData = await knex("warehouses").select(
      "id",
      "warehouse_name",
      "address",
      "city",
      "country",
      "contact_name",
      "contact_position",
      "contact_phone",
      "contact_email"
    );
    return res.status(200).json(warehousesData);
  } catch (error) {
    console.error("Error getting warehouses:", error);
    res.status(500).send("Error getting warehouses", error);
  }
};

export const getWarehouseById = async (req, res) => {
  const { warehouseId } = req.params;
  try {
    const warehouseDetailsData = await knex("warehouses")
      .select(
        "id",
        "warehouse_name",
        "address",
        "city",
        "country",
        "contact_name",
        "contact_position",
        "contact_phone",
        "contact_email"
      )
      .where({ id: warehouseId })
      .first();

    if (!warehouseDetailsData) {
      return res
        .status(404)
        .json({ message: `Warehouse with id ${warehouseId} not found` });
    }

    return res.status(200).json(warehouseDetailsData);
  } catch (error) {
    res.status(500).send(`Error getting warehouse ${warehouseId} by id`);
  }
};

export const getWarehouseInventoryById = async (req, res) => {
  const { warehouseId } = req.params;
  try {
    const warehouseDetailsData = await knex("warehouses")
      .where({ id: warehouseId })
      .first();

    if (!warehouseDetailsData) {
      return res
        .status(404)
        .json({ message: `Warehouse with id ${warehouseId} not found` });
    }

    const inventoryData = await knex("inventories")
      .select("id", "item_name", "category", "status", "quantity")
      .where({ warehouse_id: warehouseId });

    return res.status(200).json(inventoryData);
  } catch (error) {
    console.error(
      `Error getting inventory for warehouse ${warehouseId}: ${error}`
    );
    res.status(500).json({
      message: `Error getting inventory for warehouse ${warehouseId}`,
    });
  }
};

export const addNewWarehouse = async (req, res) => {
  const newWarehouse = req.body;
  try {
    await knex("warehouses").insert(newWarehouse);
    return res
      .status(201)
      .json({ message: "New warehouse succesfully added", newWarehouse });
  } catch (error) {
    console.error(`Error adding new warehouse: ${error}`);
    res.status(500).json({ message: `Error adding new warehouse to database` });
  }
};

export const editExistingWarehouse = async (req, res) => {
  const { warehouseId } = req.params;
  const updatedWarehouse = req.body;
  try {
    const warehouseDetailsData = await knex("warehouses")
      .where({
        id: warehouseId,
      })
      .first();

    if (!warehouseDetailsData) {
      return res
        .status(404)
        .json({ message: `Warehouse with id ${warehouseId} not found` });
    }

    await knex("warehouses")
      .where({
        id: warehouseId,
      })
      .first()
      .update(updatedWarehouse);

    return res.status(200).json({
      message: `Warehouse ${warehouseId} uppdated successfully`,
      updatedWarehouse,
    });
  } catch (error) {
    console.error(`Error updating warehouse ${warehouseId}: ${error}`);
    res
      .status(500)
      .json({ message: `Error updating warehouse ${warehouseId}` });
  }
};

export const deleteWarehouse = async (req, res) => {
  const { warehouseId } = req.params;
  try {
    await knex("warehouses").where({ id: warehouseId }).delete();
    res
      .status(204)
      .json({ message: `Warehouse ${warehouseId} has been deleted` });
  } catch (error) {
    console.error(`Error deleting warehouse ${warehouseId}: ${error}`);
    res
      .status(500)
      .json({ message: `Error deleting warehouse ${warehouseId}` });
  }
};
