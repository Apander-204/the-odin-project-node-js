const { Client } = require("pg");
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  password VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS files (
  filename VARCHAR ( 255 ),
  userid INTEGER
);
`

async function createTables() {
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

createTables();