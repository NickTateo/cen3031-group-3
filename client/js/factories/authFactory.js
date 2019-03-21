angular.module('auth').factory('Auth', function ($http) {
    var methods = {
        //TODO : The below api calls can and may change as we develop the api.
        login: (username, password) => {
            return $http.get(`/api/login?username=${username}&password=${password}`);
        },

        signup: (username, password) => {
            return $http.post(`/api/signup?username=${username}&password=${password}`);
        }
    };
    return methods;
});