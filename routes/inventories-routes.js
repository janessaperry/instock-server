import express from "express";
import * as InventoriesController from "../controllers/inventories-controller.js";
const router = express.Router();

router
  .get("/", InventoriesController.getAllInventories)
  .get("/:inventoryId", InventoriesController.getInventoryById)
  .delete("/:inventoryId", InventoriesController.deleteInventoryById);

export default router;
