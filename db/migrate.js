import { up as warehousesUp } from "./migrations/tables/01_warehouses.js";
import { up as inventoriesUp } from "./migrations/tables/02_inventories.js";
import sql from "./db.js";

const runMigrations = async () => {
  try {
    console.log("Running migrations");
    await warehousesUp();
    await inventoriesUp();
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Error running migrations", error);
  } finally {
    await sql.end();
    process.exit(0);
  }
};

runMigrations();
