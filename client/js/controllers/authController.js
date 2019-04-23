angular.module('auth').controller('AuthController', ['$scope', 'Auth',
    function ($scope, Auth) {
		
		
        $scope.flip = function() {
            if ($scope.flipClass !== 'flipped') {
				$scope.flipClass = 'flipped';
            }
            else {
                $scope.flipClass = '';
            }
        }

        $scope.login = function() {
            Auth.login($scope.login.user, $scope.login.pwd).then(function(info) {
                console.log('Reached login success');
				console.log(info);
				
                Auth.allowAuth(info.data);
                
                console.log(window.sessionStorage.getItem("auth"));
				
				if(window.sessionStorage.getItem("auth") === "true"){ 
                    window.location.href = '/auth/search/' + window.sessionStorage.getItem("token");
                    /*console.log(window.sessionStorage.getItem("token"));
                    Auth.searchPage(window.sessionStorage.getItem("token")).then( function(response){
                        window.location.replace("/search");
                    });
                    */
                }
                else {
                    window.alert("Access denied");
                }
            });
        }

        $scope.signup = function() {
            Auth.signup($scope.signup.user, $scope.signup.pwd)
            /*.then(function(response) {
				if (response.status == 200) {
					//Are we logging the user in automatically after signup?
					//Or do we force them to login manually?
					alert('Signup granted');
				}
				else {
					//Compose user creation message
					alert('Invalid Signup');
				}
            });
            */
        }
    }
]);