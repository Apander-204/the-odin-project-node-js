const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 )
);

INSERT INTO usernames (username) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: "localhost",
    user: "postgres",
    database: "top_users",
    password: "Apander13",
    port: 5432
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();