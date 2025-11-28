const { Client } = require("pg");
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  category VARCHAR ( 255 ),
  price DECIMAL,
  brand VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS cars (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  brand VARCHAR ( 255 ),
  model VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS product_car_compatibility (
  product_id INTEGER,
  car_id INTEGER
);

INSERT INTO products (name, category, price, brand) VALUES
('Front brake pads', 'Brakes', 2500, 'Bosch'),
('Oil filter', 'Brakes', 800, 'Mann'),
('Air filter', 'Brakes', 1200, 'Bosch');

INSERT INTO cars (brand, model) VALUES
('Toyota', 'Camry'),
('Volkswagen', 'Golf'), 
('Lada', 'Vesta');

INSERT INTO product_car_compatibility (product_id, car_id) VALUES
(1, 1), (1, 2), (2, 1), (3, 3);
`

async function createDB() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT)
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

createDB();