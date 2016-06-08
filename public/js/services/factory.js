angular.module('rfcService', [''])

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
