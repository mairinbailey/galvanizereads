var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/books', function(req, res, next) {
  knex('book').select().then(function(books){
  res.render('books', {books: books});
  });
});

router.get('/books/:id', function(req, res, next) {
  knex('book').where({id: req.params.id}).first().then(function(book) {
    res.render('bookdetail', {book: book});
  });
});

router.get('/addBook', function(req, res, next){
  res.render('addbook');
});

router.get('/:id/deletebook', function(req, res, next) {
  knex('book').where({id: req.params.id}).first().then(function(book) {
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

module.exports = router;
