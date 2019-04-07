var mongoose = require('mongoose');
//var passport = require('passport');
var config = require('../config/config');
var Login = require('../models/login.server.model.js');

//TODO
module.exports.register = function(req, res) {
	
	//for debug
	console.log('\nPerforming registration for: \n');
	console.log(req.body);	
	
	var user = new Login();
	
	user.username = req.body.user;
	user.hash = req.body.hashpwd;
		
	user.save(function (err) {
		if (err) {
			console.log(err);
			res.status(400).send(err);
		} 
		else {
			//var token = user.generateToken();
			console.log("Registration saved");
			res.status(200).send();
			/*
			res.json({
				"token": token;
			});
			*/
		}
	});
};

//TODO
module.exports.validate = function(req, res){
	
	//for debug
	console.log("Got to validate");
	console.log(req.body);
	
	Login.find({username: req.body.user}).then(function(response) {
			if(!this) {	
				res.status(400).send(err)
				console.log("No object found");
			} else {
				if(this.validatePassword(response.body.hashpwd)) {
					res.status(200).send();
					console.log("Success! Hash matches");
				} else {
					res.status(401).send();
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