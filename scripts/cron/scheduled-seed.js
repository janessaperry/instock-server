import cron from "node-cron";
import "dotenv/config";
import postgres from "postgres";
import {runSeeds} from "../../db/seeds/index.js";

// Schedule to run at midnight every 3 days
cron.schedule("0 0 */3 * *", async () => {
  let sql = postgres(process.env.DATABASE_URL);

  try {
    console.log("Scheduled seeding in progress");
    await runSeeds(sql);
  } catch (error) {
    console.error("Error in scheduled seed:", error);
  } finally {
    console.log("End scheduled seeding connection");
    await sql.end();
  }
});
