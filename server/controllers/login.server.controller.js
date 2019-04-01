var mongoose = require('mongoose');
//var passport = require('passport');
var config = require('../config/config');
var Login = require('../models/login.server.model.js');

//TODO
//exports.create;

//exports.read

module.exports.simpleLogin = function(req, res) {
	console.log("SimpleLogin executed, request: " + req.body);
	res.status(200);
};

//TODO
module.exports.register = function(req, res) {
	
	var user = new Login();
		
	user.username = req.body.username;
	user.hash = req.body.hash;
	//user.name = req.body.name
	
	//user.savePassword(req.body.password);
	
	user.save(function (err) {
		if (err) {
		  console.log(err);
		  res.status(400).send(err);
		} 
		else {
			var token = user.generateToken();
			res.status(200);
			res.json({
				"token" : token 
			})
		}
	});
	
};

//TODO
module.exports.login = function(req, res){
	
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
};