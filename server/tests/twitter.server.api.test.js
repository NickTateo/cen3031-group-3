var should = require('should'), 
	assert = require('assert'),
    request = require('supertest'), 
    express = require('../config/express'), 
    Listing = require('../models/listings.server.model.js');

/* Global variables */
var app, agent, listing, id;

/* Unit tests for testing server side routes for the listings API */
describe('trying tests', function() {

  this.timeout(10000);

  before(function(done) {
    app = express.init();
    agent = request.agent(app);

    done();
  });

  it('try to get topics in bad area and fail', function(done) {
    agent.get('/api/twitter/Miamii')
      .expect(200)
      .end(function(err, res) {
      	// console.log((res.body));
      	assert.equal(res.body, "Sorry, That location is either not trending or is not valid.");
        // should.not.exist(err);
        // should.exist(res);
        // res.body.should.have.length(147);
        done();
      });
  });

  it('succesfully get topics in area', function(done){
  	agent.get('/api/twitter/Chicago')
  		.expect(200)
  		.end(function(err, res){
  			// console.log("res.body: ");
  			var x = JSON.parse(JSON.stringify(res.body));
  			// console.log(x[0].locations[0].name);
  			assert.equal(x[0].locations[0].name, "Chicago");
  			done();
  		});
  });

  it('succesfully get trends no hashtag', function(done){
  	agent.get('/api/twitter/trend/baseball/false')
  		.expect(200)
  		.end(function(err, res){
  			// console.log(res.body.search_metadata.query);
  			assert.equal(res.body.search_metadata.query, "-RT+baseball");
  			done();
  		});
  });

  it('succesfully get trends with hashtag', function(done){
  	agent.get('/api/twitter/trend/football/true')
  		.expect(200)
  		.end(function(err, res){
  			// console.log(res.body.search_metadata.query);
  			assert.equal(res.body.search_metadata.query, "-RT+%23football");
  			done();
  		});
  });

  it('lookup non-existant trend no hashtag, should fail', function(done){
  	agent.get('/api/twitter/trend/88jasdf98KK87/false')
  		.expect(200)
  		.end(function(err, res){
  			// console.log(res.body);
  			assert.equal(res.body, "topic has no tweets to show");
  			done();
  		});
  });

  it('lookup non-existant trend with hashtag, should fail', function(done){
  	agent.get('/api/twitter/trend/88jasdf98KK87/true')
  		.expect(200)
  		.end(function(err, res){
  			// console.log(res.body);
  			assert.equal(res.body, "topic has no tweets to show");
  			done();
  		});
  });

  it('look up trend in location, success', function(done){
  	agent.get('/api/twitter/topicByArea/Paris/Eiffel/false')
  		.expect(200)
  		.end(function(err, res){
  			// console.log(res.body);
  			assert.equal(res.body.search_metadata.query, "-RT+Eiffel");
  			done();
  		});
  });

  it('look up trend in location, fail', function(done){
  	agent.get('/api/twitter/topicByArea/Necochea/Princess+Nokia/false')
  		.expect(200)
  		.end(function(err, res){
  			assert.equal(res.body, "topic has no tweets to show");
  			done();
  		});
  });

});