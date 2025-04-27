import "dotenv/config";
import postgres from "postgres";
import { runMigrations } from "../db/migrations/index.js";

const main = async () => {
let sql = postgres(process.env.DATABASE_URL);
  try {
    console.log("Main running migrations");
    await runMigrations(sql);
  } catch (error) {
    console.error("Error running migrations", error);
    process.exit(1);
  } finally {
    await sql.end();
  }
};

main();
