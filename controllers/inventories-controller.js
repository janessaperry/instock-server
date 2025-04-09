import { Inventories } from "../models/inventories-model.js";
import { ValidationError } from "../utils/errors.js";
import { camelCaseKeys } from "../utils/helpers.js";
import { validatePayload } from "../utils/validation.js";

export const getAllInventories = async (_req, res, next) => {
  try {
    const inventoriesData = await Inventories.getAll();
    return res.status(200).json(inventoriesData);
  } catch (error) {
    next(error);
  }
};

export const getInventoryCategories = async (_req, res, next) => {
  try {
    const response = await Inventories.getCategories();
    const inventoryCategories = response.map((item, index) => {
      return { id: (index + 1).toString(), value: item.category };
    });
    return res.status(200).json(inventoryCategories);
  } catch (error) {
    next(error);
  }
};

export const getInventoryById = async (req, res, next) => {
  const { inventoryId } = req.params;
  try {
    const response = await Inventories.getById(inventoryId);
    const inventoryItemDetails = camelCaseKeys(response);
    res.status(200).json(inventoryItemDetails);
  } catch (error) {
    next(error);
  }
};

export const addNewInventoryItem = async (req, res, next) => {
  const newInventoryItem = req.body;

  try {
    const validationResults = {
      item_name: "",
      description: "",
      category: "",
      status: "",
      quantity: "",
      warehouse_id: "",
    };
    let isValidated = validatePayload(newInventoryItem, validationResults);

    if (!isValidated) {
      throw new ValidationError(
        "Issues with payload for adding inventory item",
        validationResults
      );
    }

    await Inventories.create(newInventoryItem);
    return res.status(201).json({
      message: "New inventory item successfully added",
      newInventoryItem,
    });
  } catch (error) {
    next(error);
  }
};

export const editExistingInventoryItem = async (req, res, next) => {
  const { inventoryId } = req.params;
  const updatedInventoryItem = req.body;

  try {
    const validationResults = {
      item_name: "",
      description: "",
      category: "",
      status: "",
      quantity: "",
      warehouse_id: "",
    };
    let isValidated = validatePayload(updatedInventoryItem, validationResults);

    if (!isValidated) {
      throw new ValidationError(
        "Issues with payload for editing inventory item",
        validationResults
      );
    }

    await Inventories.update(inventoryId, updatedInventoryItem);
    return res.status(200).json({
      message: `Inventory item ${inventoryId} updated successfully`,
      updatedInventoryItem,
    });
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
