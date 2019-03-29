angular.module('twitter').factory('Twitter', function ($http) {
  var methods = {
    getAll: function () {
      return $http.get('/api/twitter');
    },

    getTrends: function(userPlace){
      console.log("got to factory with userPlace: " + userPlace);
      return $http.get('/api/twitter/'+ userPlace);
    },
    areaTopic: (place,topic)=>{
      return $http.get(`/api/twitter/${place}/${topic}`);
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
