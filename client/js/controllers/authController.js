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
            /*
			Auth.login($scope.login.user, $scope.hash_pwd($scope.user.pwd)).then((result) => {
                if (result.status == 200) {
                    //Allow app access
					console.log("Access granted");
                }
                else {
                    //Compose login failure message
					console.log("\nnah son");
                }
            })
			*/
			console.log("\nUser: " + $scope.login.user + " \nPwd: " + $scope.hash_pwd($scope.user.pwd));
        }

        $scope.signup = () => {
            Auth.signup($scope.signup.user, $scope.hash_pwd($scope.signup.pwd)).then((result) => {
				if (result.status == 200) {
					//Are we logging the user in automatically after signup?
					//Or do we force them to login manually?
				}
				else {
					//Compose user creation message
					$scope.login.pwd = "";
				}
            })
        }
		
		$scope.hash_pwd = function(pass){
			//this.salt = crypto.randomBytes().toString('hex');
			var salt = '123456ABCDEF'

			//var hash = crypto.pbkdf2Sync($scope.login.pwd, salt, 1000, 128, 'sha512').toString('hex');
			//var hash = sjcl.codec.utf8String.fromBits((sjcl.hash.sha256.hash($scope.login.pwd)));
			var hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(pass));
			
			return hash;
		}

		/*
		$scope.isUserSignedIn = false;
		*/
    }
]);