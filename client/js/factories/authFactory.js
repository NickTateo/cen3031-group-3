angular.module('auth').factory('Auth', function ($http) {
	var auth_service = {
		
		//var isUserAuth = false;
		
        //TODO
        login: function(username, pass) {

			var creds = {
				user: username,
				hashpwd: this.hash(pass)
			};
			
			console.log("Log in will proceed with User: " + creds.user + " and hash: " + creds.hashpwd);
			
			return $http.post('/auth/login/', creds);
        },
		
        signup: function(username, pass) {
			
			var creds = {
				user: username,
				hashpwd: this.hash(pass)
			};
			
			console.log("Sign Up will proceed with User: " + creds.user + " and hash: " + creds.hashpwd);

			//another attempt
			return $http.post('/auth/signup/', creds);						
        },
		
		hash: function(pass){
			//var salt = '123456ABCDEF'
			
			var hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(pass));
			
			return hash;
		}
    };
    return auth_service;
});