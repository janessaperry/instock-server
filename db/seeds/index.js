import { seed as seedWarehouses } from "./01_warehouses.js";
import { seed as seedInventories } from "./02_inventories.js";

export const runSeeds = async (sql) => {
  try {
    console.log("Seeding in progress");
    await seedWarehouses(sql);
    await seedInventories(sql);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
