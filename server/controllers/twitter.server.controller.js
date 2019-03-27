var Twitter = require('twitter');

var twitter_response;

var client = new Twitter({
    consumer_key: 'i7RjwAZY3TsjP1cZbkqN2jyNg',
    consumer_secret: 'aBDFDyTyLZ4RqR6pVAI25D9fN0dsNg7XuDWDPFiLAzOFrL8VXc',
    access_token_key: '1108438506249117696-MtZU031aE7suJXAlGphvpwtkBbp9o5',
    access_token_secret: 'EAQsACn8tR1RVKVLOjrg6hx3nbDw5Aa0sDdqoXMaYYW3J'
});

function checkValidArea(userInput){
    //var woeid;
    //var twitterResponse;
    let promise = new Promise(function(resolve, reject){
        client.get('trends/available', function(error, response){
            if (error) {
                console.log(error);
                reject(error);
                throw error;
            }
            //twitterResponse = response;
            resolve(response);
        });
    });
    return promise;
}

    //promise.then(result => successCallBack(result));

async function successCallBack(result){
    var final = -1;
    await checkValidArea(result).then(twitterResponse => {
        //console.log(JSON.stringify(twitterResponse));
        for (let i = 0; i < twitterResponse.length; i++) {
            //console.log(twitterResponse[i].name);
            if (twitterResponse[i].name == result) {
                console.log("found woeid is: " + twitterResponse[i].woeid);
                final = twitterResponse[i].woeid;
                return final;
                //return woeid;            
            }
        }
    });
    
    return final;
}
    
    // console.log("woeid: " + woeid);
    // return woeid;



exports.test = (req, res, next) => {
    // client.get('trends/place', {id: '2450022'}, function(error, tweets, response) {
    return client.get('trends/place', { id: '615702' }, function (error, response) {
        if (error) {
            console.log(error);
            throw error;
        }
        // console.log(tweets);  // The favorites.
        // console.log(response);  // Raw response object.
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
    // return res.status(200).write(JSON.stringify(twitter_response));
    // res.write(JSON.stringify(twitter_response));
}


exports.dynamicTrends = async function(req, res, next){
    var woeid = await successCallBack(req.params.userPlace);
    console.log("woeid is: " + woeid);
    var userPlace;
    if (woeid != -1) {
        return client.get('trends/place', { id: woeid }, function (error, response) {
            if (error) {
                console.log(error);
                throw error;
            }
            // console.log(tweets);  // The favorites.
            // console.log(response);  // Raw response object.
            twitter_response = response;
            console.log("got info from twitter");
            //console.log(JSON.stringify(twitter_response));
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
    console.log("in server controller looking at " + req.params.userPlace);
    return res.status(200);
}