angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function ($scope, Listings) {
    var graphExists = false;
    var chart;

    var canvas = document.getElementById("test-chart");
    canvas.addEventListener('click', clickHndlr, false);
    function clickHndlr(event){
      var selected = chart.getElementAtEvent(event);
      if(selected.length == 0){
        console.log("clicked on unimportant area");
      }
      else{
        console.log("trend is "+selected[0]._model.label);
      }
    };

    $scope.searchTrend = function() {
      var userInput = $scope.userPlace;
      console.log("clicked button");
      Listings.getTrends(userInput).then(function(response){
        if(graphExists){
          var tmpChart = chart;
          chart = null;
          tmpChart.destroy();
        }
        $scope.listings = response.data;
        if($scope.listings == "Sorry, That location is either not trending or is not valid."){
          graphExists = false;
          document.getElementById('no-results').style.display="block";
        }
        else{
          document.getElementById('no-results').style.display="none";
          //console.log($scope.listings[0].trends[3]);
          var labelName = [], labelPop = [];
          for (var i = 0; i < 10; i++) {
            labelName[i] = $scope.listings[0].trends[i].name;
            labelPop[i] = $scope.listings[0].trends[i].tweet_volume;
          }
          //console.log($scope.listings.length);
          //console.log("Trends in " + $scope.listings[0].locations[0].name);
          var ctx = document.getElementById('test-chart').getContext('2d');
          chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',

            // The data for our dataset
            data: {
              labels: labelName,
              datasets: [{
                label: 'Trending Topics in '+$scope.listings[0].locations[0].name,
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
          graphExists = true;  
        } 
      }, function (error) {
        console.log('Unable to retrieve listings:', error);
        });

      
      
    };

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