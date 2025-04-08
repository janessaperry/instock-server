import sql from "../db.js";
import {
  createUpdateTimestamp,
  dropUpdateTimestamp,
} from "./helpers/timestamps/create-update-timestamp.js";
import {
  createUpdateTimestampTrigger,
  dropUpdateTimestampTrigger,
} from "./helpers/timestamps/trigger-update-timestamp.js";
import {
  createInventoriesTable,
  dropInventoriesTable,
} from "./tables/02_create_inventories_table.js";

export async function up() {
  try {
    await createInventoriesTable();

    await sql`
      ALTER TABLE inventories ENABLE ROW LEVEL SECURITY;
    `;

    await sql`
      CREATE POLICY "Allow all operations"
      ON inventories
      FOR ALL
      USING (true);
    `;

    await createUpdateTimestampTrigger(
      "trig_b_u_inv_updated_at",
      "inventories"
    );
    await createUpdateTimestamp();

    console.log('Table "inventories" created successfully');
  } catch (error) {
    console.error('Error creating "inventories" table:', error);
  }
}

export async function down() {
  try {
    await dropUpdateTimestampTrigger("trig_b_u_inv_updated_at", "inventories");
    await dropUpdateTimestamp();
    await dropInventoriesTable();
    console.log('Table "inventories" dropped successfully');
  } catch (error) {
    console.error('Error dropping "inventories" table:', error);
  }
}
