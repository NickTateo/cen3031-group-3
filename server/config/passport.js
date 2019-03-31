var passport = require('passport');
//var LocalPassport = required(passport-local).Strategy;
var mongoose = require('mongoose');
var Logins = mongoose.model('Logins');

passport.use( function(username, passport, done) {
	Logins.find( { this.username: username }, function (err, login) {
		
		if (err)  throw err; 
		
		if (!login) {
			return done(null, false {
				message: 'User not found'
			});
		}
		
		if(!login.validatePassword(passport)) {
			return done(null, false {
				message: 'Passport not found'
			});
		}
		
		return done(null, login);
		
	});
});

