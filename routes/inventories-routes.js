import express from "express";
import * as InventoriesController from "../controllers/inventories-controller.js";
const router = express.Router();

router
  .get("/", InventoriesController.getAllInventories)
  .get("/categories", InventoriesController.getInventoryCategories)
  .get("/:inventoryId", InventoriesController.getInventoryById)
  .post("/add", InventoriesController.addNewInventoryItem)
  .put("/:inventoryId/edit", InventoriesController.editExistingInventoryItem)
  .delete("/:inventoryId", InventoriesController.deleteInventoryById);

export default router;
