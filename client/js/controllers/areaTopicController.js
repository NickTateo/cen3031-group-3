angular.module('twitter').controller('areaTopicController', ['$scope', 'Twitter',
    ($scope, Twitter) => {

        var place = sessionStorage.getItem('place');
        var topic = sessionStorage.getItem('topic');

        if (!place || !topic) {
            console.log("no session storage!");
            return;
        }

        Twitter.areaTopic(place, topic).then((response) => {
            console.log("Called this on init with values " + place + " and " + topic);
            // console.log(response.data.statuses[0].user.name + "'s tweet got " + response.data.statuses[0].favorite_count + " favorites");
            topTweetsGraph(response);
            populateLineGraph(response);
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

        function populateLineGraph(response) {
            var ctx = $('#line-graph').get(0).getContext('2d');
            console.log(response.data.statuses);
            let yAxis = [], xAxis = [];
            //response.statuses.sort(sorting("created_at"));
            //console.log(response);
            response.data.statuses.reverse();
            console.log(new Date(response.data.statuses[0].created_at).getHours());
            for (let i = 0; i < response.data.statuses.length; i++) {
                if (i == 10) {
                    break;
                }
                yAxis[i] = response.data.statuses[i].retweet_count;
                let dateCreated = new Date(response.data.statuses[i].created_at);
                xAxis[i] = `${(dateCreated.getHours() - 12)}:${dateCreated.getMinutes()}:${dateCreated.getSeconds()} ${dateCreated.getHours() >= 12 ? "PM" : "AM"}`;
            }


            chart = new Chart(ctx, {
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


        function topTweetsGraph(response) {
            response.data.statuses.sort(sorting("favorite_count"));
            var labelName = [], labelPop = [];
            var tweetAmount = response.data.statuses.length;
            var firstZero = -1;
            if (tweetAmount >= 10) {
                tweetAmount = 10;
                for (var i = 0; i < 10; i++) {
                    // labelName[i] = "#"+i;
                    labelPop[i] = response.data.statuses[i].favorite_count;
                    if (firstZero == -1 && response.data.statuses[i].favorite_count == 0) {
                        firstZero = i;
                    }
                }
            }
            else {
                for (var i = 0; i < tweetAmount; i++) {
                    // labelName[i] = "#"+i;
                    labelPop[i] = response.data.statuses[i].favorite_count;
                    if (firstZero == -1 && response.data.statuses[i].favorite_count == 0) {
                        firstZero = i;
                    }
                }
            }

            console.log(labelPop);
            console.log(labelName);
            console.log("first zero: " + firstZero);

            if (firstZero == 0) {
                console.log("No top tweets");
                return;
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
            chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: labelName,
                    datasets: [{
                        label: '',
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
    }
]);