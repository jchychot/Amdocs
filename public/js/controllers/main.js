angular.module('rfcController',[])

.controller('mainController', ['$scope', '$http', 'RFC_factory', function($scope, $http,RFC_factory){
  $scope.request = {};
  // create entry
  $scope.createRFC = function(){

      if($scope.request.text != undefined){

        RFC_factory.create($scope.request)
          .success(function(data){

              $scope.request = {};
    
          });


      }
  };


}]);
