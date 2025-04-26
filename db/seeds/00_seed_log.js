export async function seed(sql) {
  try {
    await sql`DELETE FROM seed_log`;
    await sql`
      INSERT INTO seed_log DEFAULT VALUES
    `;
    console.log("Seed log data seeded successfully");
  } catch (error) {
    console.error("Error seeding seed log data:", error);
  }
}