import sql from "../db.js";

export async function seed() {
  try {
    await sql`DELETE FROM warehouses`;
    await sql`
      INSERT INTO warehouses (warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email)
      VALUES
        ('Manhattan', '503 Broadway', 'New York', 'USA', 'Parmin Aujla', 'Warehouse Manager', '+1 (646) 123-1234', 'paujla@instock.com'),
        ('Washington', '33 Pearl Street SW', 'Washington', 'USA', 'Greame Lyon', 'Warehouse Manager', '+1 (646) 123-1234', 'glyon@instock.com'),
        ('Jersey', '300 Main Street', 'New Jersey', 'USA', 'Brad MacDonald', 'Warehouse Manager', '+1 (646) 123-1234', 'bmcdonald@instock.com'),
        ('SF', '890 Brannnan Street', 'San Francisco', 'USA', 'Gary Wong', 'Warehouse Manager', '+1 (646) 123-1234', 'gwong@instock.com'),
        ('Santa Monica', '520 Broadway', 'Santa Monica', 'USA', 'Sharon Ng', 'Warehouse Manager', '+1 (646) 123-1234', 'sng@instock.com'),
        ('Seattle', '1201 Third Avenue', 'Seattle', 'USA', 'Daniel Bachu', 'Warehouse Manager', '+1 (646) 123-1234', 'dbachu@instock.com'),
        ('Miami', '2650 NW 5th Avenue', 'Miami', 'USA', 'Alana Thomas', 'Warehouse Manager', '+1 (646) 123-1234', 'athomas@instock.com'),
        ('Boston', '215 Essex Street', 'Boston', 'USA', 'Vanessa Mendoza', 'Warehouse Manager', '+1 (646) 123-1234', 'vmendoza@instock.com')
    `;
    console.log("Warehouses data seeded successfully");
  } catch (error) {
    console.error("Error seeding warehouses data:", error);
    process.exit(1);
  }
}
