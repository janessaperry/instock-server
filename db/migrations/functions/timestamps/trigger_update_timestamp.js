export async function createUpdateTimestampTrigger(
  sql,
  triggerName,
  tableName
) {
  try {
    await sql`
      CREATE TRIGGER ${sql(triggerName)}
      BEFORE UPDATE ON ${sql(tableName)}
      FOR EACH ROW
      EXECUTE FUNCTION update_timestamp()
    `;
    console.log(`Trigger ${triggerName} created successfully`);
  } catch (error) {
    console.error("Error creating trigger:", error);
  }
}

export async function dropUpdateTimestampTrigger(sql, triggerName, tableName) {
  try {
    await sql`DROP TRIGGER IF EXISTS ${sql(triggerName)} ON ${sql(tableName)}`;
    console.log(`Trigger ${triggerName} dropped successfully`);
  } catch (error) {
    console.error("Error dropping trigger:", error);
  }
}
