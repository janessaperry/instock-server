import { up as warehousesUp } from "./migrations/1741749245612_create-warehouses-table.js";
import { up as inventoriesUp } from "./migrations/1741749284758_create-inventories-table.js";
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
