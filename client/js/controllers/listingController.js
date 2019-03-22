angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function ($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function (response) {
      $scope.listings = response.data;
      console.log($scope.listings[0].trends[3]);
      var labelName = [], labelPop = [];
      for (var i = 0; i < 10; i++) {
        labelName[i] = $scope.listings[0].trends[i].name;
        labelPop[i] = $scope.listings[0].trends[i].tweet_volume;
      }
      console.log($scope.listings.length);
      var ctx = document.getElementById('test-chart').getContext('2d');
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
          labels: labelName,
          datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: labelPop,
            display: true
          }]
        },

        // Configuration options go here
        options: {
          scales: {
            xAxes: [{
              scaleLabel :
              {
                display: true,
                labelString: "Trends"
              }
            }],
            yAxes: [{
              scaleLabel : 
              {
                display:true,
                labelString: "Tweet Volume"
              }
            }]
          }
        }
      });
    }, function (error) {
      console.log('Unable to retrieve listings:', error);
    });

    //$scope.detailedInfo = undefined;

    // $scope.addListing = function () {
    //   /**TODO 
    //   *Save the article using the Listings factory. If the object is successfully 
    //   saved redirect back to the list page. Otherwise, display the error
    //  */
    //   let listing = { code: $scope.code, name: $scope.name, address: $scope.address, coordinates: { latitude: $scope.lat, longitude: $scope.long } };
    //   Listings.create(listing).then((result) => {
    //     if (result.status == 200) {
    //       Listings.getAll().then((result) => {
    //         $scope.listings = result.data;
    //       }, (error) => {
    //         console.log("Error retrieving updated listings.", error);
    //       })
    //     }
    //     else {
    //       console.log("Error adding entry", result.status);
    //     }
    //   });
    //   $scope.name = "";
    //   $scope.code = "";
    //   $scope.address = "";
    //   $scope.long = "";
    //   $scope.lat = "";

    // }

    // $scope.deleteListing = function (id) {
    //   /**TODO
    //      Delete the article using the Listings factory. If the removal is successful, 
    //  navigate back to 'listing.list'. Otherwise, display the error. 
    //     */
    //   Listings.delete(id).then((result) => {
    //     if (result.status == 200) {
    //       Listings.getAll().then((result) => {
    //         $scope.listings = result.data;
    //       }, (error) => {
    //         console.log("Error retrieving updated listings", error);
    //       })
    //     }
    //     else {
    //       console.log("Error deleting entry", result.status);
    //     }
    //   });
    // };

    // $scope.showDetails = function (index) {
    //   $scope.detailedInfo = $scope.list[index];
    // };
  }
]);