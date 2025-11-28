const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "postgres",
  database: "top_users",
  password: "Apander13",
  port: 5432
});