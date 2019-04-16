angular.module('auth').controller('AuthController', ['$scope', 'Auth',
    function ($scope, Auth) {
		
        //$('.rotate-btn').click(()=>{
        //     $('#login-card').toggleClass("flipped");
        //});
		
        $scope.flip = function() {
            if ($scope.flipClass !== 'flipped') {
				$scope.flipClass = 'flipped';
            }
            else {
                $scope.flipClass = '';
            }
        }

        $scope.login = function() {
			Auth.login($scope.login.user, $scope.login.pwd).then(function(response) {
                if(response.status == 200) {
					//Allow app access
					//Auth.allowAccess(true);
                }
                else {
                    //Compose login failure message
					alert('Invalid Login');
				}
			});
        }

        $scope.signup = function() {
            Auth.signup($scope.signup.user, $scope.signup.pwd).then(function(response) {
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
        }
    }
]);