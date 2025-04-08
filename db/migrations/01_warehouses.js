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
  createWarehousesTable,
  dropWarehousesTable,
} from "./tables/01_create_warehouses_table.js";

export async function up() {
  try {
    await createWarehousesTable();

    await sql`
      ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;
    `;

    await sql`
      CREATE POLICY "Allow all operations"
      ON warehouses
      FOR ALL
      USING (true);
    `;

    await createUpdateTimestampTrigger("trig_b_u_wh_updated_at", "warehouses");
    await createUpdateTimestamp();

    console.log('Table "warehouses" created successfully');
  } catch (error) {
    console.error('Error creating "warehouses" table:', error);
  }
}

export async function down() {
  try {
    await dropUpdateTimestampTrigger("trig_b_u_wh_updated_at", "warehouses");
    await dropUpdateTimestamp();
    await dropWarehousesTable();
    console.log('Table "warehouses" dropped successfully');
  } catch (error) {
    console.error('Error dropping "warehouses" table:', error);
  }
}
