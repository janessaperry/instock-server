import cron from "node-cron";
import "dotenv/config";
import postgres from "postgres";
import { runSeeds } from "../../db/seeds/index.js";

let sql = postgres(process.env.DATABASE_URL);

cron.schedule("0 0 */3 * *", async () => {
  try {
    console.log("Scheduled seeding in progress");
    await runSeeds(sql);
  } catch (error) {
    console.error("Error in scheduled seed:", error);
    process.exit(1);
  } finally {
    await sql.end();
  }
});
