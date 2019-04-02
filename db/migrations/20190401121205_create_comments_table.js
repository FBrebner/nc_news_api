exports.up = function(knex, Promise) {
    console.log("creating comments table...");
    return knex.schema.createTable("comments", commentsTable => {
      commentsTable.increment("comment_id").primary();
      commentTables
      .foreign("author")
      .references("username")
      .inTable("users");
      commentTables
      .foreign("topic")
      .references("topic")
      .inTable("topics");
      commentsTable.integer("votes").defaultTo(0).notNullable;
      commentTables.date('created_at').defaultTo(knex.fn.now())
      commentsTable.string("body").notNullable;
    });
  };
  
  exports.down = function(knex, Promise) {
    console.log("removing comments tables...");
    return knex.schema.dropTable("comments");
  };
  