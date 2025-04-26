import {
  createSeedLogTable,
  dropSeedLogTable,
} from "./tables/00_create_seed_log_table.js";

export async function up(sql) {
  try {
    await createSeedLogTable(sql);
    console.log('Table "seed_log" created successfully');
  } catch (error) {
    console.error('Error creating "seed_log" table:', error);
  }
}

export async function down(sql) {
  try {
    await dropSeedLogTable(sql);
    console.log('Table "seed_log" dropped successfully');
  } catch (error) {
    console.error('Error dropping "seed_log" table:', error);
  }
}
