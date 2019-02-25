// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');
let user = require('../models/users');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});


router.get('/login', (req, res, next) => {
  res.render('auth/login', {
    title: 'Login',
    books: ''
   });
});

router.post('/login', (req, res, next) => {
  res.render('auth/login', {
    title: 'Login',
    books: ''
   });
});

router.get('/register', (req, res, next) => {
  res.render('auth/register', {
    title: 'Login',
    books: ''
   });
});

router.post('/register', (req, res, next) => {
  res.render('auth/register', {
    title: 'Login',
    books: ''
   });
});

module.exports = router;
