var mongoose = require('mongoose'),
	//passport = require('passport'),
	config = require('../config/config'),
	Login = require('../models/login.server.model.js'),
	fs = require('fs'),
	path = require('path');  

//TODO
module.exports.register = function(req, res) {
	
	//for debug
	console.log('\nPerforming registration for: \n');
	console.log(req.body);	
	
	res.setHeader('content-type', 'text/html');
	
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
			console.log('Registration saved');
			res.setHeader('content-type', 'text/html');
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
	console.log('Got to validate');
	console.log(req.body);
	
	res.setHeader('content-type', 'text/html');
	
	Login.findOne({username: req.body.user}, function(err, result) {
			if(err) {
				res.status(400).send(err);
			} else if(!result) {
				res.status(400).send()
				console.log('No object found');
			} else {
				if(result.validatePassword(req.body.hashpwd)) {
					//res.setHeader('content-type', 'text/html');
					res.status(200).send();
					console.log('Success! Hash matches');
				} else {
					res.status(401).send();
					console.log('Checked hash, didn\'t match');
				}
			}	
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
module.exports.passthrough = function(req, res) {
	//for debug
	console.log('Got to redirect');
	console.log(req.body);
	
	fs.readFile(path.resolve('/client/index.html'), function(err, newpage) {
		if(err) {
			res.status(400).send(err);
		}
		res.setHeader('Content-type', 'text/html');
		res.status(200);
		res.send(newpage);
	});	
}
*/

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