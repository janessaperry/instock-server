import { seed as seedWarehouses } from "./seeds/01_warehouses.js";
import { seed as seedInventories } from "./seeds/02_inventories.js";
import sql from "./db.js";

async function runSeeds() {
  try {
    console.log("Seeding in progress");
    await seedWarehouses();
    await seedInventories();
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await sql.end();
    process.exit(0);
  }
}

runSeeds();
