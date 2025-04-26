import { up as seedLogUp } from "./00_seed_log.js";
import { up as warehousesUp } from "./01_warehouses.js";
import { up as inventoriesUp } from "./02_inventories.js";

export const runMigrations = async (sql) => {
  try {
    console.log("Running migrations");
    await seedLogUp(sql);
    await warehousesUp(sql);
    await inventoriesUp(sql);
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Error running migrations", error);
  }
};
