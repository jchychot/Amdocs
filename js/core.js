angular.module('rfcService', [])

.factory('RFC_factory', ['$http','$q', function($http, $q){
var authorizationResult = false;
return{
  create_form : function(data){
      return $http.post('/api/rfc', data);
  },
  create_form2 : function(data){
      return $http.post('/api/rfc/', data);
  },
  get : function() {
      return $http.get('/api/rfc');
},
  modify_form : function(data){
    return $http.put('/api/rfc', data);
  },
  getCC : function(email,id){
    return $http.get('/api/rfc/'+email+'/' + id);
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

.controller('mainController', ['$scope', '$http','RFC_factory','$q',  function($scope, $http, RFC_factory,$q){
$scope.request = {};
$scope.request.status = 'pending';
//initialize twitter
RFC_factory.initialize();
//RFC_factory.initialize();
  // create entry
  $scope.createRFC = function(){

  $scope.request.name= $('#username').html();
  $scope.request.email = email2;
  $scope.request.impact = $('input[name="optradio"]:checked').val();
  $scope.request.result = $('input[name="optradio1"]:checked').val();
  $scope.request.implemented = $('input[name="optradio2"]:checked').val();
  $scope.request.duration = $('input[name="optradio3"]:checked').val();
  $scope.request.hard_soft = $('input[name="optradio4"]:checked').val();
  $scope.request.outage = $('input[name="optradio5"]:checked').val();
  $scope.request.test = $('input[name="optradio6"]:checked').val();
  $scope.request.SLA = $('input[name="optradio7"]:checked').val();
  $scope.request.start_date = document.getElementById("date1").value
  $scope.request.end_date = document.getElementById("date2").value
  $scope.request.rt= $( "#r option:selected" ).map(function(){ return $(this).text();}).get().join();
  $scope.request.nt= $( "#t option:selected" ).map(function(){ return $(this).text();}).get().join();
  $scope.request.categories = $( "#c option:selected" ).map(function(){ return $(this).text();}).get().join();

  if($scope.request.subject != undefined){

var json = JSON.stringify($scope.request,null, 4);

        RFC_factory.create_form(json)
          .success(function(data){

              $scope.request = {};

          });
            window.top.location = "options.html";
      }
      else {
        toastr.error('Please fill in required fields!','Error',{
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
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

  $scope.getCC = function(email, id){

    RFC_factory.getCC(email,id)
    .then(function(obj){
      console.log(obj.data[0]);
console.log(obj.data[0].email);
console.log(obj.data[0].SLA);

$scope.request.subject = obj.data[0].subject;
$scope.request.impact = obj.data[0].impact;
$scope.request.result = obj.data[0].result;
$scope.request.outage = obj.data[0].subject;
$scope.request.test = obj.data[0].test;
$scope.request.descriptions= obj.data[0].descriptions;
$scope.request.start_date = obj.data[0].start_date ;
$scope.request.end_date = obj.data[0].end_date;
if(obj.data[0].status === 'pending'){
  toastr.warning('Pending','Status',{
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  });
}
if(obj.data[0].status === 'approved'){
  toastr.success('Approved!','Status',{
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  });
}
if(obj.data[0].status === 'rejected'){
  toastr.error('Rejected!','Status',{
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  });
}
    });
  };


}]);
// core
angular.module('rfcapp', ['rfcController','rfcService','ngRoute']);
