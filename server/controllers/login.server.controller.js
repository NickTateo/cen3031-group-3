var mongoose = require('mongoose'),
	//passport = require('passport'),
	config = require('../config/config'),
	Login = require('../models/login.server.model.js'),
	fs = require('fs'),
	path = require('path'),
	jwt = require('jsonwebtoken');  

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
			var tkn = user.generateToken();
			console.log('Registration saved');
			res.setHeader('content-type', 'text/html');
			res.status(200).send({ auth: true, token: tkn});
			/*
			res.json({
				"token": token
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
			var tnk;
			if(err) {
				res.status(400).send(err);
			} else if(!result) {
				res.status(200).send({"auth": false, "token": null});
				console.log('User not found');
			} else {
				if(result.validatePassword(req.body.hashpwd)) {
					tnk = result.generateToken();
					//console.log(tnk);
					//res.setHeader('content-type', 'text/html');
					
					res.status(200).send({"auth": true, "token" : tnk});
					//.send({auth : true, token: tnk});
					console.log('Success! Hash matches');
				} else {
					res.status(200).send({"auth": false, "token": null});
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

module.exports.validateToken = function(req, res){
	var tnk = req.params.token;
	//console.log(req);
	if(!tnk){
		res.status(401).send({auth: false, message: "access not granted"});
	}
	jwt.verify(tnk,config.jwt_secret,function(err,decoded){
		if(err) {
			console.log(err);
			decoded.status(500).send({auth: false, message: "fail to authentify token"});
		}
		
		Login.findById(decoded._id, function(err, user) {
			if(err) user.status(401).send({auth: false, message: "error on finding user"});

			res.sendFile(path.resolve('client/index.html'));
		});
	})


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