import express from "express";
import cors from "cors";
import "dotenv/config";
import warehousesRoutes from "./routes/warehouses-routes.js";
// import inventoryRoutes from "./routes/inventory-routes.js";

const app = express();
const { SERVER_PORT, CORS_ORIGIN } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use("/warehouses", warehousesRoutes);
// app.use("/inventory", inventoryRoutes);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
