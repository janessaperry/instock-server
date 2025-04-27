import "dotenv/config";
import express from "express";
import cors from "cors";
import {requestLogger} from "./middleware/requestLogger.js";
import {errorHandler} from "./middleware/errorHandler.js";
import {seedOnStartup} from "./scripts/seed-on-startup.js";
import warehousesRoutes from "./routes/warehouses-routes.js";
import inventoriesRoutes from "./routes/inventories-routes.js";
import "./scripts/cron/scheduled-seed.js";

const app = express();
app.set('trust proxy', true);
const {SERVER_PORT, CORS_ORIGIN} = process.env;

app.use(cors({origin: CORS_ORIGIN}));
app.use(express.json());

app.use(requestLogger);

app.use("/warehouses", warehousesRoutes);
app.use("/inventories", inventoriesRoutes);

app.use(errorHandler);

app.listen(SERVER_PORT, async () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
  await seedOnStartup();
});
