// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', isAuthenticated, (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books,
        user: req.user
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', isAuthenticated, (req, res, next) => {

     res.render('books/details', {
        title: 'Add Books',
        books: new book(),
        user: req.user
      });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', isAuthenticated,  (req, res, next) => {

     let newBook = new book();
     newBook.Title = req.body.title;
     newBook.Price = req.body.price;
     newBook.Author = req.body.author;
     newBook.Genre = req.body.genre;
     newBook.Description = "";
     newBook.save(function(err) {
      if (err) {
        return console.error(err.message);
        return res.redirect('/books/add');
      }
      return res.redirect('/books');
    }); 

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', isAuthenticated, (req, res, next) => {


     book.findById(req.params.id, (err, books) => {
       if (err) {
         return console.error(err);
       }
       else {
         res.render('books/details', {
           title: 'Book Details',
           books: books,
           user: req.user
         });
       }
     });

});

// POST - process the information passed from the details form and update the document
router.post('/:id', isAuthenticated ,(req, res, next) => {

book.findById(req.params.id, (err, book) => {
       if (err) {
         return console.error(err);
       }
       else {
         book.Title = req.body.title;
         book.Price = req.body.price;
         book.Author = req.body.author;
         book.Genre = req.body.genre;
         book.Description = "";
         book.save(function(err) {
          if (err) {
            return console.error(err.message);
            return res.redirect('/'+req.params.id);
          }
          return res.redirect('/books');
        }); 
       }
     });
     //newBook._id = req.params.id;
});

// GET - process the delete by user id
router.get('/delete/:id', isAuthenticated, (req, res, next) => {

      book.findByIdAndRemove(req.params.id, (err, books) => {
       if (err) {
         return console.error(err);
       }
       else {
        return res.redirect('/books');
       }
     });
});

function isAuthenticated(req, res, next) {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.isAuthenticated())
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/');
}

module.exports = router;
