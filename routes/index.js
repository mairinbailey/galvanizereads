var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/books', function(req, res, next) {
  knex('book').join('book_author', 'book_id', 'book.id').join('author', 'author_id', 'author.id').select('book.title', 'book.genre', 'book.description', 'book.cover_url', 'book.id as book_id', 'author.id as author_id', 'author.first_name', 'author.last_name').then(function(books){
  res.render('books', {books: books});
  });
});


router.get('/books/:id', function(req, res, next) {
  Promise.all([
    knex('book').select('*', 'book.id as book_id').where({'book.id': req.params.id}).first(),
    knex('author').join('book_author','author_id','author.id').select('author.id as author_id', 'author.first_name', 'author.last_name').where({
      book_id: req.params.id})
  ]).then(function(data){
  res.render('bookdetail', {book: data[0], author: data[1]});
});
});

router.get('/addBook', function(req, res, next){
  res.render('addbook');
});

router.get('/:id/deletebook', function(req, res, next) {
  knex('book').join('book_author', 'book_id', 'book.id').join('author', 'author_id', 'author.id').select('book.title', 'book.genre', 'book.description', 'book.cover_url', 'book.id as book_id', 'author.id as author_id', 'author.first_name', 'author.last_name').where({
    book_id: req.params.id}).first().then(function(book) {
    res.render('deletebook', {book: book});
  });
});

router.get('/:id/confirmDeleteBook', function (req, res, next){
  knex('book').where({id: req.params.id}).del().then(function() {
  res.redirect('/books');
  });
});

router.get('/:id/editbook', function(req, res, next) {
  knex('book').where({id: req.params.id}).first().then(function(book) {
    res.render('editbook', {book: book});
  });
});

router.get('/authors', function(req, res, next) {
  knex('book').join('book_author', 'book_id', 'book.id').join('author', 'author_id', 'author.id').select('book.title', 'book.genre', 'book.description', 'book.cover_url', 'book.id as book_id', 'author.id as author_id', 'author.first_name', 'author.last_name','author.portrait_url', 'author.biography').then(function(authors){
  res.render('authors', {authors: authors});
  });
});

router.get('/authors/:id', function(req, res, next) {
  Promise.all([
    knex('author').select('*', 'author.id as author_id').where({'author.id': req.params.id}).first(),
    knex('book').join('book_author','book_id','book.id').select('book.id as book_id', 'book.title').where({
      author_id: req.params.id})
  ]).then(function(data){
  res.render('authordetail', {author: data[0], book: data[1]});
});
});


router.get('/addAuthor', function(req, res, next){
  res.render('addauthor');
});


router.get('/:id/deleteauthor', function(req, res, next) {
  knex('book').join('book_author', 'book_id', 'book.id').join('author', 'author_id', 'author.id').select('book.title','book.id as book_id', 'author.id as author_id', 'author.first_name', 'author.last_name','author.portrait_url', 'author.biography').where({
    author_id: req.params.id}).first().then(function(author) {
      console.log(author)
    res.render('deleteauthor', {author: author});
  });
});

router.get('/:id/confirmDeleteAuthor', function (req, res, next){
  knex('author').where({id: req.params.id}).del().then(function() {
  res.redirect('/authors');
  });
});

router.get('/:id/editauthor', function(req, res, next) {
  knex('author').where({id: req.params.id}).first().then(function(author) {
    res.render('editauthor', {author: author});
  });
});

router.post('/addBook', function(req, res, next){
  knex('book').insert(req.body).then(function(){
    res.redirect('/books');
  }).catch(function(err){
    console.log(err);
    next(err)
  });
});

router.post('/:id/editbook', function(req, res, next) {
  knex('book').where({id:req.params.id}).update(req.body).then(function(book) {
    res.redirect('/books');
  });
});

router.post('/addAuthor', function(req, res, next){
  knex('author').insert(req.body).then(function(){
    res.redirect('/authors');
  }).catch(function(err){
    console.log(err);
    next(err)
  });
});

router.post('/:id/editauthor', function(req, res, next) {
  knex('author').where({id:req.params.id}).update(req.body).then(function(book) {
    res.redirect('/authors');
  });
});

module.exports = router;
