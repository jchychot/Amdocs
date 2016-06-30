$( document ).ready(function() {

  var id = getParameterByName('id');
  if(id != null){
  var scope = angular.element(document.getElementById("page-top")).scope();
    scope.$apply(function () {
    scope.getCC(id);
    });
  }
 });

var email2 = '';
