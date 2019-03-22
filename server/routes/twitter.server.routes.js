var twitter = require('../controllers/twitter.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/')
    .get(twitter.test);


module.exports = router;