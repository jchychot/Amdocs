angular.module('rfcController',[])

.controller('mainController', ['$scope', '$http', 'RFC', function($scope, $http,RFC){
  $scope.request = {};
  $scope.stage = "";
  // create entry
  $scope.createRFC = function(){

      if($scope.request.text != undefined){

          RFC.create($scope.request)
          .then(function(data){
              $scope.request = {};
              $scope.stage = "submitted";
              $scope.rfc = data;
          });

      }
  };


}]);
