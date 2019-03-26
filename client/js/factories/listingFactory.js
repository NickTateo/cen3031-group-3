angular.module('listings').factory('Listings', function ($http) {
  var methods = {
    getAll: function () {
      return $http.get('/api/twitter');
    },

    getTrends: function(userPlace){
      console.log("got to factory with userPlace: " + userPlace);
      return $http.get('/api/twitter/'+ userPlace);
    },

    create: function (listing) {
      return $http.post('/api/listings', listing);
    },

    delete: function (id) {
      /**TODO
         return result of HTTP delete method
        */
      return $http.delete('/api/listings/'+ id);
    }
  };

  return methods;
});
