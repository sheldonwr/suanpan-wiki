const Postgres = require('postgres')

const sql = Postgres({
  host: "127.0.0.1",
  port: "5432",
  username: "wikijs",
  password: "wikijsrocks",
  database: "wiki"
});

module.exports = sql;