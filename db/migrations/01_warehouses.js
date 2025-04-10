import {
  createUpdateTimestamp,
  dropUpdateTimestamp,
} from "./functions/timestamps/create_update_timestamp.js";
import {
  createUpdateTimestampTrigger,
  dropUpdateTimestampTrigger,
} from "./functions/timestamps/trigger_update_timestamp.js";
import {
  createWarehousesTable,
  dropWarehousesTable,
} from "./tables/01_create_warehouses_table.js";

export async function up(sql) {
  try {
    await createWarehousesTable(sql);

    await sql`
      ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;
    `;

    await sql`
      CREATE POLICY "Allow all operations"
      ON warehouses
      FOR ALL
      USING (true);
    `;

    await createUpdateTimestampTrigger(
      sql,
      "trig_b_u_wh_updated_at",
      "warehouses"
    );
    await createUpdateTimestamp(sql);

    console.log('Table "warehouses" created successfully');
  } catch (error) {
    console.error('Error creating "warehouses" table:', error);
  }
}

export async function down(sql) {
  try {
    await dropUpdateTimestampTrigger(
      sql,
      "trig_b_u_wh_updated_at",
      "warehouses"
    );
    await dropUpdateTimestamp(sql);
    await dropWarehousesTable(sql);
    console.log('Table "warehouses" dropped successfully');
  } catch (error) {
    console.error('Error dropping "warehouses" table:', error);
  }
}
