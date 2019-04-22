var path = require('path'),
	express = require('express'),
	mongoose = require('mongoose'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	config = require('./config'),
	loginRouter = require('../routes/login.server.routes.js'),
	twitterRouter = require('../routes/twitter.server.routes.js'),
	CORS = require('cors');

module.exports.init = function () {
	//connect to database
	mongoose.connect(config.db.uri, { useMongoClient: true });

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

	//serve static files
	app.use('/', express.static(path.join(__dirname, './../../client/'), options));

	//send user to login page
	app.get('/', function (req, res) {
		res.sendFile(path.resolve('client/login.html'));
	});

	//Use the login router for authorization requests 
	app.use('/auth', loginRouter);
	app.use('/api/twitter', twitterRouter);

	app.get('/search/', function (req, res) {
		res.sendFile(path.resolve('client/index.html'));
	});

	//Go to login for all routes not specified
	//	?? * vs /* ??
	app.all('/*', function (req, res) {
		res.redirect('/');
	});

	return app;
};  