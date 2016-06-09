// Service
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

// Service
angular.module('rfcController',[])

.controller('mainController', ['$scope', '$http',  function($scope, $http){
// $scope.request = {};
//
//   RFC_factory.get()
//   .success(function(data){
//     console.log("hey2");
//     $scope.rfcs = data;
//   });
//   // create entry
//   $scope.createRFC = function(){
// 		alert('hey this is called!');
//           if($scope.request.text != undefined){
//
//         RFC_factory.create($scope.request)
//           .success(function(data){
//
//               $scope.request = {};
//
//           });
//       }
//   };
  $scope.heyy = function(){
    alert('heeeee');
  };


}]);
// core
angular.module('rfcapp', ['rfcController','rfcService','ngRoute']);
