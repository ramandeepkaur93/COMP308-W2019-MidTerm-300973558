const passport = require('passport');
const mongoose = require('mongoose');
//handling user serialization
module.exports = function() {
	require('../models/users');
	const User = mongoose.model('users');
	//authenticated user must be serialized to the session
	passport.serializeUser(function(user, done) {done(null, user.id);});
	//deserialize when requests are made
	passport.deserializeUser(function(id, done) {User.findOne({ _id: id }, 
	'-password -salt', function(err, user) {done(err, user);});
	});
	
	require(__dirname+'/strategies/local')(); //include the local strategy config file
};
