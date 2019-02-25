// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     res.render('books/details', {
        title: 'Add Books',
        books: new book(),
      });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
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
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     book.findById(req.params.id, (err, books) => {
       if (err) {
         return console.error(err);
       }
       else {
         res.render('books/details', {
           title: 'Book Details',
           books: books
         });
       }
     });

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
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

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
      book.findByIdAndRemove(req.params.id, (err, books) => {
       if (err) {
         return console.error(err);
       }
       else {
        return res.redirect('/books');
       }
     });
});


module.exports = router;
