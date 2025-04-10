import express from "express";
import * as InventoriesController from "../controllers/inventories-controller.js";
import { writeOperationsLimiter } from "../middleware/rateLimiter.js";
const router = express.Router();

router
  .get("/", InventoriesController.getAllInventories)
  .get("/categories", InventoriesController.getInventoryCategories)
  .get("/:inventoryId", InventoriesController.getInventoryById)
  .post(
    "/add",
    writeOperationsLimiter,
    InventoriesController.addNewInventoryItem
  )
  .put(
    "/:inventoryId/edit",
    writeOperationsLimiter,
    InventoriesController.editExistingInventoryItem
  )
  .delete(
    "/:inventoryId",
    writeOperationsLimiter,
    InventoriesController.deleteInventoryById
  );

export default router;
