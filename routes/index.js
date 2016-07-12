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

router.get('/add', function(req, res, next){
  res.render('addbook');
});

router.get('/:id/delete', function(req, res, next) {
  knex('book').where({id: req.params.id}).first().then(function(book) {
    res.render('deletebook', {book: book});
  });
});

router.get('/:id/confirmDelete', function (req, res, next){
  knex('book').where({id: req.params.id}).del().then(function() {
  res.redirect('/books');
  });
});

router.post('/add', function(req, res, next){
  knex('book').insert(req.body).then(function(){
    res.redirect('/books');
  }).catch(function(err){
    console.log(err);
    next(err)
  });
});


module.exports = router;
