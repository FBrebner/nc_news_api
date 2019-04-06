exports.up = function(knex, Promise) {
    return knex.schema.createTable("comments", commentsTable => {
      commentsTable.increments("comment_id").primary().notNullable;
      commentsTable
      .string("author")
      .references("username")
      .inTable("users").notNullable;
      commentsTable.integer('article_id').references('articles.article_id').onDelete('CASCADE').notNullable;
      commentsTable.integer("votes").defaultTo(0).notNullable;
      commentsTable.date('created_at').defaultTo(knex.fn.now())
      commentsTable.text("body").notNullable;
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable("comments");
  };
  