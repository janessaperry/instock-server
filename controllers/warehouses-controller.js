import { Warehouses } from "../models/warehouses-model.js";

export const getAllWarehouses = async (_req, res, next) => {
  try {
    const warehousesData = await Warehouses.findAll();
    return res.status(200).json(warehousesData);
  } catch (error) {
    next(error);
  }
};

export const getWarehouseById = async (req, res, next) => {
  const { warehouseId } = req.params;
  try {
    const warehouse = await Warehouses.findById(warehouseId);
    return res.status(200).json(warehouse);
  } catch (error) {
    next(error);
  }
};

export const getWarehouseInventoryById = async (req, res, next) => {
  const { warehouseId } = req.params;
  try {
    const inventoryData = await Warehouses.getInventory(warehouseId);
    return res.status(200).json(inventoryData);
  } catch (error) {
    next(error);
  }
};

export const addNewWarehouse = async (req, res, next) => {
  const newWarehouse = req.body;
  //todo need to add form validation check and throw new error

  try {
    await Warehouses.create(newWarehouse);
    return res
      .status(201)
      .json({ message: "New warehouse succesfully added", newWarehouse });
  } catch (error) {
    next(error);
  }
};

export const editExistingWarehouse = async (req, res, next) => {
  const { warehouseId } = req.params;
  const updatedWarehouse = req.body;
  //todo need to add form validation check and throw new error

  try {
    await Warehouses.update(warehouseId, updatedWarehouse);
    return res.status(200).json({
      message: `Warehouse ${warehouseId} updated successfully`,
      updatedWarehouse,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWarehouse = async (req, res, next) => {
  const { warehouseId } = req.params;
  try {
    await Warehouses.delete(warehouseId);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
