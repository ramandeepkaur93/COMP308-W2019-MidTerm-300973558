const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('users');
//Register the strategy 
module.exports = function() {
passport.use(

		new LocalStrategy(function(username, password, done) {
	//find a user with that username and authenticate it
		User.findOne({username: username}, (err, user) => {
			if (err) {
				console.log(err);
				return done(err); //done is a Passport function
			}
			if (!user) {
				return done(null, false, {message: 'user not found'});
			}
			if (!user.authenticate(password)) {
				return done(null, false, {message: 'Invalid password'});
			}
				return done(null, user); // user is authenticated
			});
		}));
};
