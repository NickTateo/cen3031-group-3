/* register the modules the application depends upon here*/
angular.module('auth', []);
angular.module('listings', []);


/* register the application and inject all the necessary dependencies */
var app = angular.module('TweetData', ['listings','auth']);