angular.module('rfcService', [])

.factory('RFC', ['$http', function($http){
return{
  create : function(data){
      return $http.post('/api/rfc', data);
  }
}
}]);
