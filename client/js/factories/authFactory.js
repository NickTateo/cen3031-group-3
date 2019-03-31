angular.module('auth').factory('Auth', function ($http) {
    var methods = {
        //TODO : The below api calls can and may change as we develop the api.
        login: function(username) {
			//old request format
            //return $http.get(`/api/login?username=${username}&password=${password}`);
			
			//request will use auth/ path
			//return $http.get(auth/login?username);
        },

        signup: function(username, pass_hash) {
			//old request format
            //return $http.post(`/api/signup?username=${username}&password=${password}`);
        }
    };
    return methods;
});