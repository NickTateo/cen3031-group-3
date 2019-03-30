var twitter = require('../controllers/twitter.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/')
    .get(twitter.test);

router.route('/:userPlace')
	.get(twitter.dynamicTrends);

router.route('/topicByArea')
	.get(twitter.areaTopicTweets);

module.exports = router;