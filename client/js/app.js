/* register the modules the application depends upon here*/
angular.module('auth', []);
angular.module('twitter', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('tweetData', ['auth', 'twitter']);