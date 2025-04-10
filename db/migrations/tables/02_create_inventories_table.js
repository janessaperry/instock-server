export async function createInventoriesTable(sql) {
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

    console.log('Table "inventories" created successfully');
  } catch (error) {
    console.error('Error creating "inventories" table:', error);
  }
}

export async function dropInventoriesTable(sql) {
  try {
    await sql`DROP TABLE IF EXISTS warehouses`;
    await sql`DROP TABLE IF EXISTS inventories`;
    console.log('Table "inventories" dropped successfully');
  } catch (error) {
    console.error('Error dropping "inventories" table:', error);
  }
}
