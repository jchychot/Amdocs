<!-- Services -->
angular.module('rfcService', [])

.factory('RFC_factory', ['$http', function($http){
return{
  create : function(data){
      return $http.post('/api/rfc', data);
  },

  get : function() {
      return $http.get('/api/rfc');
}
}
}]);

<!-- Controller-->
angular.module('rfcController',[])

.controller('mainController', ['$scope', '$http', 'RFC_factory', function($scope, $http,RFC_factory){
  $scope.request = {};

  RFC_factory.get()
  .success(function(data){
    console.log("hey2");
    $scope.rfcs = data;
  });
  // create entry
  $scope.createRFC = function(){
		alert('hey this is called!');
          if($scope.request.text != undefined){

        RFC_factory.create($scope.request)
          .success(function(data){

              $scope.request = {};

          });
      }
  };


}]);
<!-- Core -->
angular.module('rfcapp', ['rfcController','rfcService','ngRoute']);
