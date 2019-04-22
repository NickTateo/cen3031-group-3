angular.module('auth').factory('Auth', function ($http, $window) {
	var auth_service = {
		
        //TODO
        login: function(username, pass) {

			var creds = {
				user: username,
				hashpwd: this.hash(pass)
			};
			
			console.log('Log in will proceed with User: ' + creds.user + ' and hash: ' + creds.hashpwd);
			
			return $http.post('/auth/login/', creds);
			/*.then(function(info) {
				
				console.log('Reached login success');
				console.log(info);
				
				auth_service.allowAuth(info.data);
				
				if(window.sessionStorage.auth) window.location.href = '/search';
				else window.alert("Access denied");
			});
			*/
        },
		
        signup: function(username, pass) {
			
			var creds = {
				user: username,
				hashpwd: this.hash(pass)
			};
			
			console.log('Sign Up will proceed with User: ' + creds.user + ' and hash: ' + creds.hashpwd);

			//another attempt
			return $http.post('/auth/signup/', creds);						
        },
		
		hash: function(pass){
			//var salt = '123456ABCDEF'
			
			var hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(pass));
			
			return hash;
		},
		
		
		allowAuth: function(info){
			$window.sessionStorage.token = info.token;
			$window.sessionStorage.auth = info.auth;
		},

		searchPage: function(token){
			return $http.get('/search/' + token);
		},
		
    };
    return auth_service;
});