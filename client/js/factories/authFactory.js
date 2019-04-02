angular.module('auth').factory('Auth', function ($http) {

	var auth_service = {
		
		/*
		var isUserAuth = false;
		*/
		
        //TODO : The below api calls can and may change as we develop the api.
        login: function(username, pass) {
			//request will use auth/ path
			console.log('Login will proceed with Usr: ' + username + ' and password hash: ' + this.hash(pass));
			return $http.post('/auth/' + username + '/' + this.hash(pass));
        },

        signup: function(username, pass) {
			//old request format
            //return $http.post(`/api/signup?username=${username}&password=${password}`);
			console.log("Sign Up will proceed with Usr: " + username + " and password hash: " + this.hash(pass));
			return $http.post('/auth/signup/' + username + '/' + this.hash(pass));
        },
		
		hash: function(pass){
			//this.salt = crypto.randomBytes().toString('hex');
			//var salt = '123456ABCDEF'
			//var hash = crypto.pbkdf2Sync($scope.login.pwd, salt, 1000, 128, 'sha512').toString('hex');
			//var hash = sjcl.codec.utf8String.fromBits((sjcl.hash.sha256.hash($scope.login.pwd)));
			
			var hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(pass));
			
			return hash;
		}
    };
    return auth_service;
});