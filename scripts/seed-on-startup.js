import "dotenv/config";
import postgres from "postgres";
import { runSeeds } from "../db/seeds/index.js";

export const seedOnStartup = async () => {
  let sql = postgres(process.env.DATABASE_URL);

  try {
    console.log("Start up: check last_seeded_at");
    const [row] = await sql`SELECT last_seeded_at FROM seed_log`;
    const lastSeededAt = new Date(row?.last_seeded_at);
    const hours24InMs = 24 * 60 * 60 * 1000;
    const time24HoursAgo = Date.now() - hours24InMs;

    if (lastSeededAt.getTime() < time24HoursAgo) {
      console.log("Startup: more than 24 hours since last seed, reseeding...");
      await runSeeds(sql);
    } else {
      console.log("Startup: less than 24 hours since last seed, skipping reseed");
    }
  } catch (error) {
    console.error("Error in scheduled seed:", error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}