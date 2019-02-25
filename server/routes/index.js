// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
// define the game model
let book = require('../models/books');
let User = require('../models/users');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: '',
    user: req.user
   });
});


router.get('/login', (req, res, next) => {
  res.render('auth/login', {
    title: 'Login',
    books: '',
    user: req.user,
    messages: req.flash('error') || req.flash('info')
   });
});

router.route('/login').post(passport.authenticate('local', {
	successRedirect: '/books/',
	failureRedirect: '/login',
	failureFlash: true
}));

router.get('/register', (req, res, next) => {
  res.render('auth/register', {
    title: 'Login',
    books: '',
    user: req.user,
    messages: req.flash('error') || req.flash('info')
   });
});

router.post('/register', (req, res, next) => {
	if (!req.user) {
		console.log("signuppost");
		var user = new User(req.body);
		var message = null;
		user.provider = 'local';
		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				console.log(err);
				return res.redirect('/register');
			}
			req.login(user, function(err) { //req.login is Passport method
				if (err) return next(err);
				return res.redirect('/books/');
			});
		});
	} else {
		return res.redirect('/books/');
	}
});

router.get('/signout', function(req, res) {
	req.logout(); // invalidate the authenticated session using a Passport method
	res.redirect('/');
});

var getErrorMessage = function(err) {
	var message = '';
	if (err.code) {
	switch (err.code) { //using error codes
		case 11000:
		case 11001:
			message = 'Username already exists';
			break;
		default:
			message = 'Something went wrong';
	}
	} else { // a Mongoose validation error 
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].
			message;
			}
		}
	return message;
};

module.exports = router;
