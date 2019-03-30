// stuff for twitter api
var Twitter = require('twitter');

var twitter_response;

var client = new Twitter({
    consumer_key: 'i7RjwAZY3TsjP1cZbkqN2jyNg',
    consumer_secret: 'aBDFDyTyLZ4RqR6pVAI25D9fN0dsNg7XuDWDPFiLAzOFrL8VXc',
    access_token_key: '1108438506249117696-MtZU031aE7suJXAlGphvpwtkBbp9o5',
    access_token_secret: 'EAQsACn8tR1RVKVLOjrg6hx3nbDw5Aa0sDdqoXMaYYW3J'
});


// stuff for geocoder api
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'opencage',
    httpAdapter: 'https',
    apiKey: '095ea1c908db4188932d39190371a784',
    formatter: null
};

var geocoder = NodeGeocoder(options);


// functionality
function checkValidArea(userInput) {
    let promise = new Promise(function (resolve, reject) {
        client.get('trends/available', function (error, response) {
            if (error) {
                console.log(error);
                reject(error);
                throw error;
            }
            for (let i = 0; i < response.length; i++) {
                if (response[i].name == userInput) {
                    console.log("found woeid is: " + response[i].woeid);
                    resolve(response[i].woeid);
                }
            };
            resolve(-1);
        });

    })
    return promise;
}


exports.test = (req, res, next) => {
    // return client.get('trends/place', { id: '615702' }, function (error, response) {
    //     if (error) {
    //         console.log(error);
    //         throw error;
    //     }
    //     twitter_response = response;
    //     console.log("got info from twitter");

    //     function sortTrends(tweet_volume) {
    //         return function (a, b) {
    //             if (a[tweet_volume] < b[tweet_volume]) {
    //                 return 1;
    //             }
    //             else if (a[tweet_volume] > b[tweet_volume]) {
    //                 return -1;
    //             }
    //             return 0;
    //         }
    //     }
    //     twitter_response[0].trends.sort(sortTrends("tweet_volume"));

    //     return res.status(200).json(twitter_response);
    // });
    return res.status(200).json("Sorry, That location is either not trending or is not valid.");
}


exports.dynamicTrends = function (req, res, next) {
    console.log("\nin dynamicTrends()!");
    checkValidArea(req.params.userPlace).then(woeid => {
        console.log("Result is " + woeid);
        if (woeid != -1) {
            client.get('trends/place', { id: woeid}, function (error, response) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                twitter_response = response;
                console.log("got info from twitter");
                function sortTrends(tweet_volume) {
                    return function (a, b) {
                        if (a[tweet_volume] < b[tweet_volume]) {
                            return 1;
                        }
                        else if (a[tweet_volume] > b[tweet_volume]) {
                            return -1;
                        }
                        return 0;
                    }
                }
                twitter_response[0].trends.sort(sortTrends("tweet_volume"));
    
                return res.status(200).json(twitter_response);
            });
        }
        else {
            return res.status(200).json("Sorry, That location is either not trending or is not valid.");
        }
    });
}

function getCoord(place){
    // let promise = new Promise(function(resolve, reject){
    //     geocoder.geocode(place, function(error, response){
    //         console.log("getting coords");
    //         if(error){
    //             console.log("could not get place coordinates, error from geocoder api below:");
    //             console.log(error);
    //             resolve(-1);
    //         }
    //         var lat = response[0].latitude;
    //         var lon = response[0].longitude;
    //         var coord =    {latitude: lat, 
    //                         longitude: lon};
    //         console.log("got coords of " + place + ": " + JSON.stringify(coord));
    //         resolve(coord);
    //     });
    // })
    // return promise;
}

exports.areaTopicTweets = function(req, res, next){
    console.log("\nin areaTopicTweets()!");
    // var place = req.place;
    // var topic = req.topic;
    console.log("in backend with place: " + req.params.place + " and topic: " + req.params.topic + "has hash? " + req.params.isHash);
    // console.log(req.params.place);


    // getCoord(place).then(function(coord){
    //     console.log("got coords: " + coord.latitude + ", " + coord.longitude);
    //     return res.status(200).json("hi from backend controller with " + place + " and " + topic + " and coords: " + coord);
    // });
}