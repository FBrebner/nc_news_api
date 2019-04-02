exports.up = function(knex, Promise) {
  console.log("creating articles table...");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increment("article_id").primary();
    articlesTable.string("title").notNullable;
    articlesTable.string("body").notNullable;
    articlesTable.integer("votes").defaultTo(0).notNullable;
    articleTables
      .foreign("topic")
      .references("topic")
      .inTable("topics");
    articleTables
      .foreign("author")
      .references("username")
      .inTable("users");
    articleTables.date('created_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  console.log("removing articles tables...");
  return knex.schema.dropTable("articles");
};
