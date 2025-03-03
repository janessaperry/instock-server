import express from "express";
import * as warehouseController from "../controllers/warehouses-controller.js";
const router = express.Router();

router
  .get("/", warehouseController.getAllWarehouses)
  .get("/:warehouseId", warehouseController.getWarehouseById)
  .get(
    "/:warehouseId/inventories",
    warehouseController.getWarehouseInventoryById
  )
  .post("/add", warehouseController.addNewWarehouse)
  .put("/:warehouseId/edit", warehouseController.editExistingWarehouse);

export default router;
