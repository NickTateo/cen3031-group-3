var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'),
	loginRouter = require('../routes/login.server.routes.js'),
    CORS = require('cors');

module.exports.init = function() {
	//connect to database
	mongoose.connect(config.db.uri, {useMongoClient: true});

	//initialize app
	var app = express();
	
	var options = {
		index: false
	}

	//enable request logging for development debugging
	app.use(morgan('dev'));

	//body parsing middleware 
	app.use(bodyParser.json());

	app.use(CORS());

	/** TODO
	Serve static files 
	*/
	app.use('/', express.static(path.join(__dirname,'./../../client/'), options));
	
	//send user to login page
	app.get('/*', function(req, res) {
		res.sendFile(path.resolve('client/login.html'));
	});	
	
	/** TODO
	Use the listings router for requests to the api
	Use the login router for authorization requests 
	*/
	app.use('/auth', loginRouter);
	//app.use('/api/listings', listingsRouter);
	
	/** TODO
	Go to homepage for all routes not specified */ 
	
	/*
	app.all('/*', function(req, res) {
		res.redirect('/api/auth');
		//res.sendFile(path.resolve('client/login.html'));
	});
	*/
	
	return app;
};  