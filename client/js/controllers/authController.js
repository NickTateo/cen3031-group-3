angular.module('auth').controller('AuthController', ['$scope', 'Auth',
    function ($scope, Auth) {
		
        //$('.rotate-btn').click(()=>{
        //     $('#login-card').toggleClass("flipped");
        //});
		
        $scope.flip = function(){
            if ($scope.flipClass !== "flipped") {
				$scope.flipClass = "flipped";
            }
            else {
                $scope.flipClass = "";
            }
        }

        $scope.login = function(){
			Auth.login($scope.login.user, $scope.login.pwd).then(function(response) {
                    //Allow app access
					console.log("\nAccess granted\n");
                },
                function(error) {
                    //Compose login failure message
					console.log("\nInvalid Login\n");
				}
			);
        }

        $scope.signup = function(){
            Auth.signup($scope.signup.user, $scope.signup.pwd).then((result) => {
				if (result.status == 200) {
					//Are we logging the user in automatically after signup?
					//Or do we force them to login manually?
					console.log("\nSignup granted\n");
				}
				else {
					//Compose user creation message
					console.log("\nInvalid Signup\n");
				}
            });
        }
    }
]);