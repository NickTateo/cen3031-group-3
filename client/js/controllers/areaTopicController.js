angular.module('twitter').controller('areaTopicController', ['$scope', 'Twitter',
    ($scope, Twitter) => {

        var responseData, lineGraph, barGraphTweets = null;
        var place = sessionStorage.getItem('place');
        var topic = sessionStorage.getItem('topic');

        $scope.topic = topic;
        $scope.place = place;


        if (!place || !topic) {
            console.log("no session storage!");
            return;
        }

        Twitter.areaTopic(place, topic).then((response) => {
            console.log(response);
            if(response.data == "topic has no tweets to show"){
                console.log("yeah no tweets to show");
                emptyData();
                return;
            }
            console.log("Called this on init with values " + place + " and " + topic);
            responseData = response.data.statuses;
            $scope.barTweetsFavorites();
            $scope.lineRetweets();
        });

        function sorting(sortParam) {
            return function (a, b) {
                if (a[sortParam] < b[sortParam]) {
                    return 1;
                }
                else if (a[sortParam] > b[sortParam]) {
                    return -1;
                }
                return 0;
            }
        }

        function emptyData(){
            console.log("in the emptyData function");
            var no_result = document.getElementsByClassName("no-result");
            for(var i = 0; i < no_result.length; i++){
                no_result[i].style.display="block";
            }
            var yes_result = document.getElementsByClassName("yes-result");
            yes_result[0].style.display="none";

            var toggle_btns = document.getElementsByClassName("hide-btn");
            for(var i = 0; i < toggle_btns.length; i++){
                toggle_btns[i].style.display="none";
            }
            return;
        }

        $scope.barTweetsFavorites = function() {
            responseData.sort(sorting("favorite_count"));
            var labelName = [], labelPop = [];
            var tweetAmount = responseData.length;
            var firstZero = -1;
            if (tweetAmount >= 10) {
                tweetAmount = 10;
                for (var i = 0; i < 10; i++) {
                    // labelName[i] = "#"+i;
                    labelPop[i] = responseData[i].favorite_count;
                    if (firstZero == -1 && responseData[i].favorite_count == 0) {
                        firstZero = i;
                    }
                }
            }
            else {
                for (var i = 0; i < tweetAmount; i++) {
                    // labelName[i] = "#"+i;
                    labelPop[i] = responseData[i].favorite_count;
                    if (firstZero == -1 && responseData[i].favorite_count == 0) {
                        firstZero = i;
                    }
                }
            }

            console.log(labelPop);
            console.log(labelName);
            console.log("first zero: " + firstZero);

            if (firstZero == 0) {
                console.log("No top tweets");
                // return;
            }
            if (firstZero != -1) {
                for (var i = 0; i < firstZero; i++) {
                    var num = i + 1;
                    labelName[i] = "#" + num;
                }
            }
            else {
                for (var i = 0; i < tweetAmount; i++) {
                    var num = i + 1;
                    labelName[i] = "#" + num;
                }
            }

            var ctx = document.getElementById('top-tweets').getContext('2d');
            if(!barGraphTweets){
                barGraphTweets = new Chart(ctx, {
                    // The type of chart we want to create
                    type: 'bar',

                    // The data for our dataset
                    data: {
                        labels: labelName,
                        datasets: [{
                            label: 'Favorites',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: labelPop,
                            display: true
                        }]
                    },

                    // Configuration options go here
                    options: {
                        scales: {
                            xAxes: [{
                                scaleLabel:
                                {
                                    display: true,
                                    labelString: "Top Tweets"
                                }
                            }],
                            yAxes: [{
                                scaleLabel:
                                {
                                    display: true,
                                    labelString: "# of Favorites"
                                }
                            }]
                        }
                    }
                });
            }
            else{
                // ??????
            barGraphTweets.data.datasets[0].data = labelPop;
            barGraphTweets.data.labels = labelName;
            barGraphTweets.options.scales.yAxes[0].scaleLabel.labelString = "# of Favorites"
            barGraphTweets.data.datasets[0].label = "Favorites";
            barGraphTweets.update();
            }
        }

        $scope.barTweetsRetweets = function(){
            responseData.sort(sorting("retweet_count"));
            var labelName = [], labelPop = [];
            var tweetAmount = responseData.length;
            var firstZero = -1;
            if (tweetAmount >= 10) {
                tweetAmount = 10;
                for (var i = 0; i < 10; i++) {
                    // labelName[i] = "#"+i;
                    labelPop[i] = responseData[i].retweet_count;
                    if (firstZero == -1 && responseData[i].retweet_count == 0) {
                        firstZero = i;
                    }
                }
            }
            else {
                for (var i = 0; i < tweetAmount; i++) {
                    // labelName[i] = "#"+i;
                    labelPop[i] = responseData[i].retweet_count;
                    if (firstZero == -1 && responseData[i].retweet_count == 0) {
                        firstZero = i;
                    }
                }
            }

            if (firstZero == 0) {
                console.log("No top tweets");
                // return;
            }
            if (firstZero != -1) {
                for (var i = 0; i < firstZero; i++) {
                    var num = i + 1;
                    labelName[i] = "#" + num;
                }
            }
            else {
                for (var i = 0; i < tweetAmount; i++) {
                    var num = i + 1;
                    labelName[i] = "#" + num;
                }
            }

            barGraphTweets.data.datasets[0].data = labelPop;
            barGraphTweets.data.labels = labelName;
            barGraphTweets.options.scales.yAxes[0].scaleLabel.labelString = "# of Retweets"
            barGraphTweets.data.datasets[0].label = "Retweets";
            barGraphTweets.update();

        }

        $scope.lineFavorites = function () {
            var yAxis = [], xAxis = [];
            let filteredResult = responseData.filter(val => val.favorite_count !== 0).sort((a, b) => { return new Date(a.created_at) - new Date(b.created_at) })

            for (let i = 0; i < filteredResult.length; i++) {
                if (i == 10) {
                    break;
                }
                yAxis[i] = filteredResult[i].favorite_count;
                let dateCreated = new Date(filteredResult[i].created_at);
                xAxis[i] = `${(dateCreated.getHours() % 12)}:${dateCreated.getMinutes()}:${dateCreated.getSeconds()} ${dateCreated.getHours() >= 12 ? "PM" : "AM"}`;
            }

            lineGraph.data.datasets[0].data = yAxis;
            lineGraph.data.labels = xAxis;
            lineGraph.options.scales.yAxes[0].scaleLabel.labelString = "# of Favorites"
            lineGraph.data.datasets[0].label = "Favorites";
            lineGraph.update();
        }
        $scope.lineRetweets = function () {
            var ctx = $('#line-graph').get(0).getContext('2d');
            let yAxis = [], xAxis = [];
            let filteredResult = responseData.filter(val => val.retweet_count !== 0).sort((a, b) => { return new Date(a.created_at) - new Date(b.created_at) });
            for (let i = 0; i < filteredResult.length; i++) {
                if (i == 10) {
                    break;
                }
                yAxis[i] = filteredResult[i].retweet_count;
                let dateCreated = new Date(filteredResult[i].created_at);
                xAxis[i] = `${(dateCreated.getHours() % 12)}:${dateCreated.getMinutes()}:${dateCreated.getSeconds()} ${dateCreated.getHours() >= 12 ? "PM" : "AM"}`;
            }

            if (lineGraph == null) {
                lineGraph = new Chart(ctx, {
                    type: 'line',

                    data: {
                        labels: xAxis,
                        datasets: [{
                            label: "Retweets",
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: yAxis,
                            display: true
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: "Trends (time)"
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: "# of Retweets"
                                }
                            }]
                        }

                    }
                })
            }
            else {
                lineGraph.data.datasets[0].data = yAxis;
                lineGraph.data.labels = xAxis;
                lineGraph.options.scales.yAxes[0].scaleLabel.labelString = "# of Retweets"
                lineGraph.data.datasets[0].label = "Retweets";
                lineGraph.update();
            }
        }
    }
]);