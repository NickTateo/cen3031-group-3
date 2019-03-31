/* Dependencies */
var logctrl = require('../controllers/login.server.controller.js'), 
	express = require('express'), 
	router = express.Router();

/* 
	These method calls are responsible for routing requests to the correct request handler.
	Take note that it is possible for different controller functions to handle requests to the same route.
*/
router.route('/')
	//TODO
	.get(/*determine which logcrtl method goes here*/)
	.post(/*determine which logcrtl method goes here*/);

/* The ':' specifies a URL parameter. */
router.route('/:username')
	.get(logcrtl.read)
	.put(logcrtl.update)

	//TODO
	//Will there be any need to delete login info?
	//.delete(listings.delete);

/*
	The 'router.param' method allows us to specify middleware we would like to use to handle 
	requests with a parameter.

	Say we make an example request to '/listings/566372f4d11de3498e2941c9'

	The request handler will first find the specific listing using this 'listingsById' 
	middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database, 
	and bind this listing to the request object.

	It will then pass control to the routing function specified above, where it will either 
	get, update, or delete that specific listing (depending on the HTTP verb specified)
*/
router.param('username', logctrl.login);

module.exports = router;