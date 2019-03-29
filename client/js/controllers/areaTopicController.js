angular.module('twitter').controller('AreaTopicController', ['$scope', 'Twitter',
($scope, Twitter)=>{
    Twitter.areaTopic(sessionStorage.getItem('place'),sessionStorage.getItem('topic')).then((response)=>{
        console.log(response);
    })
}
]);