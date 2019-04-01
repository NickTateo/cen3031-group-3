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

	//enable request logging for development debugging
	app.use(morgan('dev'));

	//body parsing middleware 
	app.use(bodyParser.json());

	app.use(CORS());

	//use the below to start passport
	//app.use(passport.initialize());
	//app.user('api', routesApi);

	/** TODO
	Serve static files 
	Direct to login.html?
	*/
	app.use('/', express.static(path.join(__dirname,'./../../client/')));
	
	/** TODO
	Use the listings router for requests to the api
	Use the login router for authorization requests 
	*/
	app.use('/api/listings',listingsRouter);
	app.use('/auth', loginRouter);

	/** TODO
	Go to homepage for all routes not specified 
	*/ 
	//redirect to login
	app.all('*', function(req, res) {
		//res.redirect('/');
		res.sendFile(path.resolve('client/login.html'));
	});

	return app;
};  