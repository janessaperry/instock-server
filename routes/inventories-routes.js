import express from "express";
import * as InventoriesController from "../controllers/inventories-controller.js";
const router = express.Router();

router.get("/", InventoriesController.getAllInventories);

export default router;
