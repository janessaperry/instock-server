export async function createSeedLogTable(sql) {
  try {
    await sql`
      DROP TABLE IF EXISTS seed_log CASCADE
    `;

    await sql`
      CREATE TABLE seed_log (
        id SERIAL PRIMARY KEY,
        last_seeded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Table "seed_log" created successfully');
  } catch (error) {
    console.error('Error creating "seed_log" table:', error);
  }
}

export async function dropSeedLogTable(sql) {
  try {
    await sql`DROP TABLE IF EXISTS seed_log`;
    console.log('Table "seed_log" dropped successfully');
  } catch (error) {
    console.error('Error dropping "seed_log" table:', error);
  }
}
