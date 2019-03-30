angular.module('twitter').controller('areaTopicController', ['$scope', 'Twitter',
    ($scope, Twitter) => {

        var place = sessionStorage.getItem('place');
        var topic = sessionStorage.getItem('topic');

        Twitter.areaTopic(place, topic).then((response) => {
            console.log("Called this on init with values " + place + " and " + topic);
            //console.log(response);
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
                xAxis[i] = `${(dateCreated.getHours()-12)}:${dateCreated.getMinutes()}:${dateCreated.getSeconds()} ${dateCreated.getHours() >= 12 ? "PM" : "AM"}`;
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
                                display:true,
                                labelString : "Trends (time)"
                            }
                        }],
                        yAxes : [{
                            scaleLabel : {
                                display: true,
                                labelString : "# of Retweets"
                            }
                        }]
                    }

                }
            })
        }
    }
]);