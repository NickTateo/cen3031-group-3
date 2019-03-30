angular.module('twitter').controller('areaTopicController', ['$scope', 'Twitter',
($scope, Twitter)=>{

	var place = sessionStorage.getItem('place');
	var topic = sessionStorage.getItem('topic');

    Twitter.areaTopic(place, topic).then((response)=>{
        console.log("Called this on init with values " + place + " and " + topic);
        //console.log(response);
    })
}
]);