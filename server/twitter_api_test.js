//by danny 
//THIS CODE NEEDS THE ACCESS CREDENTIALS PROVIDED BY NICK TO FUNCTION
//this is testing out the twitter api
//namely, the getting trends by location get call
//
//this does the following:
//1.) creates a twitter object
//2.) use twitter object to make a get call
//3.) the call is to return the top 50 trends in Paris (woe id of 615702)
//4.) starts a server at localhost:8080/
//5.) writes out the response in json on localhost:8080/ 

var Twitter = require('twitter');

const fs = require('fs');

var twitter_response;
 
var client = new Twitter({
  consumer_key: 'i7RjwAZY3TsjP1cZbkqN2jyNg',
  consumer_secret: 'aBDFDyTyLZ4RqR6pVAI25D9fN0dsNg7XuDWDPFiLAzOFrL8VXc',
  access_token_key: '1108438506249117696-MtZU031aE7suJXAlGphvpwtkBbp9o5',
  access_token_secret: 'EAQsACn8tR1RVKVLOjrg6hx3nbDw5Aa0sDdqoXMaYYW3J'
});

// client.get('trends/place', {id: '2450022'}, function(error, tweets, response) {
client.get('trends/place', {id: '615702'}, function(error, response) {
  if(error){
  	console.log(error);
  	throw error;
  }
  // console.log(tweets);  // The favorites.
  // console.log(response);  // Raw response object.
  twitter_response = response;
  console.log("got info from twitter");
});


var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(JSON.stringify(twitter_response));
  res.end();
}).listen(8080); 