angular.module('twitter').controller('areaTopicController', ['$scope', 'Twitter',
($scope, Twitter)=>{

	var place = sessionStorage.getItem('place');
	var topic = sessionStorage.getItem('topic');

    Twitter.areaTopic(place, topic).then((response)=>{
        console.log("Called this on init with values " + place + " and " + topic);
        //console.log(response);
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
}
]);