var currentBoxNumber = 0;
$(".form-control").keyup(function (event) {
    if (event.keyCode == 13) {
        textboxes = $(".form-control");
        currentBoxNumber = textboxes.index(this);
        console.log(textboxes.index(this));
        if (textboxes[currentBoxNumber + 1] != null) {
            nextBox = textboxes[currentBoxNumber + 1];
            nextBox.focus();
            nextBox.select();
            event.preventDefault();
            return false;
        }
    }
});
//date picker
$(function () {
    $('.cal').datetimepicker({
      format: 'YYYY-MM-DD'
    })
    .on('changeDate', function(ev){
    $(this).datepicker('hide');
});
});


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

// controller
angular.module('rfcController',[])

.controller('mainController', ['$scope', '$http','RFC_factory',  function($scope, $http, RFC_factory){
$scope.request = {};

  // create entry
  $scope.createRFC = function(){

          if($scope.request.subject != undefined){

var json = JSON.stringify($scope.request,null, 4);
alert('done'); 
        RFC_factory.create(json)
          .success(function(data){

              $scope.request = {};

          });
      }
  };


}]);
// core
angular.module('rfcapp', ['rfcController','rfcService','ngRoute']);
