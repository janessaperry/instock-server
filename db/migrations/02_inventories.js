import {
  createUpdateTimestamp,
  dropUpdateTimestamp,
} from "./functions/timestamps/create_update_timestamp.js";
import {
  createUpdateTimestampTrigger,
  dropUpdateTimestampTrigger,
} from "./functions/timestamps/trigger_update_timestamp.js";
import {
  createInventoriesTable,
  dropInventoriesTable,
} from "./tables/02_create_inventories_table.js";

export async function up(sql) {
  try {
    await createInventoriesTable(sql);

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
      sql,
      "trig_b_u_inv_updated_at",
      "inventories"
    );
    await createUpdateTimestamp(sql);

    console.log('Table "inventories" created successfully');
  } catch (error) {
    console.error('Error creating "inventories" table:', error);
  }
}

export async function down(sql) {
  try {
    await dropUpdateTimestampTrigger(
      sql,
      "trig_b_u_inv_updated_at",
      "inventories"
    );
    await dropUpdateTimestamp(sql);
    await dropInventoriesTable(sql);
    console.log('Table "inventories" dropped successfully');
  } catch (error) {
    console.error('Error dropping "inventories" table:', error);
  }
}
