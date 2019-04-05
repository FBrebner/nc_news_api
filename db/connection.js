const knex = require("knex");
const dbConfig =
  process.env.NODE_ENV === "production"
    ? { client: "pg", connection: `${process.env.DATABASE_URL}?ssl=true` }
    : require("../knexfile");

const connection = knex(dbConfig);
module.exports = connection;
