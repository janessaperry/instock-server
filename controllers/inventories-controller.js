import sql from "../db/db.js";
import { Inventories } from "../models/inventories-model.js";

export const getAllInventories = async (_req, res, next) => {
  try {
    const inventoriesData = await Inventories.getAll();
    return res.status(200).json(inventoriesData);
  } catch (error) {
    next(error);
  }
};

export const getInventoryById = async (req, res, next) => {
  const { inventoryId } = req.params;
  try {
    const inventoryItemDetails = await Inventories.getById(inventoryId);
    res.status(200).json(inventoryItemDetails);
  } catch (error) {
    next(error);
  }
};

export const deleteInventoryById = async (req, res, next) => {
  const { inventoryId } = req.params;
  try {
    await Inventories.delete(inventoryId);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
