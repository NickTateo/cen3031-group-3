var mongoose = require('mongoose');
//var passport = require('passport');
var config = require('../config/config');
var Login = require('../models/login.server.model.js');

//TODO
module.exports.register = function(req, res) {
	
	var user = new Login();
		
	user.username = req.body.username;
	user.hash = req.body.hash;
		
	user.save(function (err) {
		if (err) {
			console.log(err);
			res.status(400).send(err);
		} 
		else {
			//var token = user.generateToken();
			console.log("register executing");
			res.status(200);
			/*
			res.json({
				"token" : token 
			})
			*/
		}
	});
};

//TODO
module.exports.validate = function(req, res){
	Login.find({username: req.username}).then(function(response) {
			if(!this) {	
				res.status(400).send(err)
				console.log("This object did not exist");
			} else {
				if(this.validatePassword(response.hash)) {
					res.status(200);
					console.log("Success! Hash matches");
				} else {
					res.status(401);
					console.log("Checked hash, didn't match");
				}
			}	
		}, 
		function(error){
			res.status(400).send(err);
		}
	);
	
	/*
	passport.authenticate('local', function(err, login, info){
		var token;

		if (err) {
		  res.status(404).json(err);
		  return;
		}

		if(user){
		  token = login.generateJwt();
		  res.status(200);
		  res.json({
			"token" : token
		  });
		} else {
		  res.status(401).json(info);
		}
	})(req, res);
	*/
};

/*
module.exports.findUser = function(req, res, next, username) {
	Login.findById(username).exec(function(err, listing) {
		if(err) {
			res.status(400).send(err);
		} else {
			req.listing = listing;
			next();
		}
	});
}
*/