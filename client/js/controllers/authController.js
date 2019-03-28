angular.module('auth').controller('AuthController', ['$scope', 'Auth',
    function ($scope, Auth) {
        // $('.rotate-btn').click(()=>{
        //     $('#login-card').toggleClass("flipped");
        // });

        $scope.flip = () => {
            if ($scope.flipClass !== "flipped") {
				$scope.flipClass = "flipped";
            }
            else {
                $scope.flipClass = "";
            }
        }

        $scope.login = () => {
            Auth.login($scope.loginUsername, $scope.loginPassword).then((result) => {
                if (result.status == 200) {
                    //Allow app access
                }
                else {
                    //Compose login failure message
                }
            })
        }

        $scope.signup = () => {
            Auth.signup($scope.signupUsername, $scope.signupPassword).then((result) => {
                if (result.status == 200) {
                    //Are we logging the user in automatically after signup?
                    //Or do we force them to login manually?

                }
                else {
                    //Compose user creation message
                    $scope.loginPassword = "";
                }
            })
        }
		
		$scope.isUserSignedIn = false;
		
		$scope.signIn = () => {
			alert("Wrong function");
		}
		
		$scope.toggle = (tog) => {
			tog.show = !tog.show;
		};
		
    }
]);