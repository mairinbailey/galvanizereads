var find = require('../helper')

exports.seed = function(knex, Promise) {
   // Deletes ALL existing entries
   return knex('book_author').del()
       .then(function() {
           return Promise.all([
               knex("book").select(),
               knex("author").select()
           ]);
       })
       .then(function(data) {
           var books = data[0];
           var authors = data[1];
           return Promise.all([

            knex('book_author').insert({
              book_id: find.findBook('Python In A Nutshell', books),
              author_id: find.findAuthor('Martelli', authors)
            }),
            knex('book_author').insert({
              book_id: find.findBook('Python In A Nutshell', books),
              author_id: find.findAuthor('Ravenscroft', authors)
            }),
            knex('book_author').insert({
              book_id: find.findBook('Python In A Nutshell', books),
              author_id: find.findAuthor('Holden', authors)
            }),

            knex('book_author').insert({
              book_id: find.findBook('Think Python', books),
              author_id: find.findAuthor('Downey', authors)
            }),
            knex('book_author').insert({
              book_id: find.findBook('Learning React Native', books),
              author_id: find.findAuthor('Eisenman', authors)
            }),
            knex('book_author').insert({
              book_id: find.findBook('You Don\'t Know JS: ES6 & Beyond', books),
              author_id: find.findAuthor('Simpson', authors)
            }),
            knex('book_author').insert({
              book_id: find.findBook('You Don\'t Know JS: Scope & Closures', books),
              author_id: find.findAuthor('Simpson', authors)
            }),
            knex('book_author').insert({
              book_id: find.findBook('You Don\'t Know JS: Async & Performance', books),
              author_id: find.findAuthor('Simpson', authors)
            })
        ]);
    });
};
