import { Warehouses } from "../models/warehouses-model.js";
import { validatePayload } from "../utils/validation.js";

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
  console.log(newWarehouse);

  try {
    const validationResults = {
      warehouse_name: "",
      address: "",
      city: "",
      country: "",
      contact_name: "",
      contact_position: "",
      contact_phone: "",
      contact_email: "",
    };
    let isValidated = validatePayload(newWarehouse, validationResults);

    if (!isValidated) {
      return res.status(400).json({
        message: "Issues with payload",
        errors: validationResults,
      });
    }

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

  try {
    const validationResults = {
      warehouse_name: "",
      address: "",
      city: "",
      country: "",
      contact_name: "",
      contact_position: "",
      contact_phone: "",
      contact_email: "",
    };
    let isValidated = validatePayload(updatedWarehouse, validationResults);

    if (!isValidated) {
      return res.status(400).json({
        message: "Issues with payload",
        errors: validationResults,
      });
    }

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
