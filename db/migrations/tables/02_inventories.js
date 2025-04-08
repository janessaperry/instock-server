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
      DROP TABLE IF EXISTS inventories
    `;

    await sql`
      CREATE TABLE inventories (
        id SERIAL PRIMARY KEY,
        warehouse_id INTEGER NOT NULL,
        item_name VARCHAR NOT NULL,
        description VARCHAR NOT NULL,
        category VARCHAR NOT NULL,
        status VARCHAR NOT NULL,
        quantity INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_warehouse
          FOREIGN KEY (warehouse_id)
          REFERENCES warehouses(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
      )
    `;

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
    await sql`DROP TABLE IF EXISTS warehouses`;
    await sql`DROP TABLE IF EXISTS inventories`;
    console.log('Table "inventories" dropped successfully');
  } catch (error) {
    console.error('Error dropping "inventories" table:', error);
  }
}
