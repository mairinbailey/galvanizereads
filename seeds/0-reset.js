exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE book, author, book_author RESTART IDENTITY CASCADE;');
};
