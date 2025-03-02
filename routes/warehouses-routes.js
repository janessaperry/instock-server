import express from "express";
import * as warehouseController from "../controllers/warehouses-controller.js";
const router = express.Router();

router
  .get("/", warehouseController.getAllWarehouses)
  .get("/:warehouseId", warehouseController.getWarehouseById)
  .get(
    "/:warehouseId/inventories",
    warehouseController.getWarehouseInventoryById
  );

export default router;
