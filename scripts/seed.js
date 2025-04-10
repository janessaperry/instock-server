import "dotenv/config";
import postgres from "postgres";
import { runSeeds } from "../db/seeds/index.js";

let sql = postgres(process.env.DATABASE_URL);

const main = async () => {
  try {
    console.log("Main running seeds");
    await runSeeds(sql);
  } catch (error) {
    console.error("Error running seeds:", error);
    process.exit(1);
  } finally {
    console.log("End connection");
    await sql.end();
  }
};

main();
