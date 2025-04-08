import sql from "../../db.js";
import {
  createUpdateTimestamp,
  dropUpdateTimestamp,
} from "../helpers/timestamps/create-update-timestamp.js";
import {
  createUpdateTimestampTrigger,
  dropUpdateTimestampTrigger,
} from "../helpers/timestamps/trigger-update-timestamp.js";

export async function up() {
  try {
    await sql`
      DROP TABLE IF EXISTS warehouses CASCADE
    `;

    await sql`
      CREATE TABLE warehouses (
        id SERIAL PRIMARY KEY,
        warehouse_name VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        city VARCHAR NOT NULL,
        country VARCHAR NOT NULL,
        contact_name VARCHAR NOT NULL,
        contact_position VARCHAR NOT NULL,
        contact_phone VARCHAR NOT NULL,
        contact_email VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

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
    await sql`DROP TABLE IF EXISTS warehouses`;
    console.log('Table "warehouses" dropped successfully');
  } catch (error) {
    console.error('Error dropping "warehouses" table:', error);
  }
}
