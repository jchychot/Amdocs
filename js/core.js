// Service
angular.module('rfcService', [])

.factory('RFC_factory', ['$http', function($http, $q){
var authorizationResult = false;
return{
  create : function(data){
      return $http.post('/api/rfc', data);
  },

  get : function() {
      return $http.get('/api/rfc');
},

        initialize: function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('19gVB-kbrzsJWQs5o7Ha2LIeX4I', {
                cache: true
            });
            //try to create an authorization result when the page loads,
            // this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create("twitter");
        },

        isReady: function() {
            return (authorizationResult);
        },

        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup("twitter", {
                cache: true
            }, function(error, result) {
                // cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error

                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        }
}
}]);

// controller
angular.module('rfcController',[])

.controller('mainController', ['$scope', '$http','RFC_factory','$q',  function($scope, $http,$q, RFC_factory){
$scope.request = {};

//initialize twitter
RFC_factory.initialize();
  // create entry
  $scope.createRFC = function(){
		alert($('#username').html());

  $scope.request.name= $('#username').html();
  $scope.request.email = email;
     $scope.request.impact = $('input[name="optradio"]:checked').val();

          if($scope.request.subject != undefined){

var json = JSON.stringify($scope.request,null, 4);

        RFC_factory.create(json)
          .success(function(data){

              $scope.request = {};

          });
      }
  };
  $scope.t_login = function(){
      RFC_factory.connectTwitter()
      .then(function(){
        if(RFC_factory.isReady())
          alert('twiter log in success');
      });


  };

}]);
// core
angular.module('rfcapp', ['rfcController','rfcService','ngRoute']);
