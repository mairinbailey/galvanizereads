exports.up = function(knex, Promise) {
  return knex.schema.createTable("book", function(table){
    table.increments();
    table.text('title');
    table.text('genre');
    table.text('description')
    table.text('cover_url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("book");
};
