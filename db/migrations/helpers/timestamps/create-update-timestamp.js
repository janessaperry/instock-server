import sql from "../../../db.js";

export async function createUpdateTimestamp() {
  try {
    await sql`
      CREATE OR REPLACE FUNCTION update_timestamp()
      RETURNS TRIGGER
      LANGUAGE plpgsql
      AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $$;
    `;
  } catch (error) {}
}

export async function dropUpdateTimestamp() {
  try {
    await sql`DROP FUNCTION IF EXISTS update_timestamp`;
    console.log(`updateTimestamp dropped successfully`);
  } catch (error) {
    console.error("Error dropping updateTimestamp:", error);
  }
}
