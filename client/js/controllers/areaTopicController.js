angular.module('twitter').controller('AreaTopicController', ['$scope', 'Twitter',
($scope, Twitter)=>{

	var place = sessionStorage.getItem('place');
	var topic = sessionStorage.getItem('topic');

    Twitter.areaTopic(place, topic).then((response)=>{
        console.log(response);
    })
}
]);