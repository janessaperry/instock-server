import express from "express";
import * as warehouseController from "../controllers/warehouses-controller.js";
import { writeOperationsLimiter } from "../middleware/rateLimiter.js";
const router = express.Router();

router
  .get("/", warehouseController.getAllWarehouses)
  .get("/:warehouseId", warehouseController.getWarehouseById)
  .get(
    "/:warehouseId/inventories",
    warehouseController.getWarehouseInventoryById
  )
  .post("/add", writeOperationsLimiter, warehouseController.addNewWarehouse)
  .put(
    "/:warehouseId/edit",
    writeOperationsLimiter,
    warehouseController.editExistingWarehouse
  )
  .delete(
    "/:warehouseId",
    writeOperationsLimiter,
    warehouseController.deleteWarehouse
  );

export default router;
