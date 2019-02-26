angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function ($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function (response) {
      $scope.listings = response.data;
    }, function (error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function () {
      /**TODO 
      *Save the article using the Listings factory. If the object is successfully 
      saved redirect back to the list page. Otherwise, display the error
     */
      let listing = { code: $scope.code, name: $scope.name, address: $scope.address, coordinates: { latitude: $scope.lat, longitude: $scope.long } };
      Listings.create(listing).then((result)=>{
        if (result.status == 200){
          Listings.getAll().then((result)=>{
            $scope.listings = result.data;
          },(error)=>{
            console.log("Error retrieving updated listings.", error);
          })
        }
        else {
          console.log("Error adding entry", result.status);
        }
      });
      $scope.name = "";
      $scope.code = "";
      $scope.address = "";
      $scope.long = "";
      $scope.lat = "";

    }

    $scope.deleteListing = function (id) {
      /**TODO
         Delete the article using the Listings factory. If the removal is successful, 
     navigate back to 'listing.list'. Otherwise, display the error. 
        */
      Listings.delete(id).then((result)=>{
        if (result.status == 200) {
          Listings.getAll().then((result)=>{
            $scope.listings = result.data;
          },(error)=>{
            console.log("Error retrieving updated listings", error);
          })
        }
        else{
          console.log("Error deleting entry", result.status);
        }
      });
    };

    $scope.showDetails = function (index) {
      $scope.detailedInfo = $scope.list[index];
    };
  }
]);