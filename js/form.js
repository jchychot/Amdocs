angular.module('rfcService', [])

.factory('RFC_factory', ['$http','$q', function($http, $q){
var authorizationResult = false;
return{
  create_user : function(data){
    return $http.post('/api/user', data);
  },
  create_form : function(data){
      return $http.post('/api/rfc', data);
  },
  create_form2 : function(data){
      return $http.post('/api/rfc/', data);
  },
  get : function() {
      return $http.get('/api/rfc');
},
get_user : function() {
    return $http.get('/api/user');
},
  modify_form : function(id,data){
    return $http.put('/api/rfc/'+id, data);
  },
  getCC : function(id){
    return $http.get('/api/rfc/'+ id);
  },
  get_profile: function(){
      return $http.get('/user/profile');
  }
}
}]);

// controller
angular.module('rfcController',[])

.controller('mainController', ['$scope', '$http','RFC_factory','$q',  function($scope, $http, RFC_factory,$q){
$scope.request = {};
$scope.request.time = new Date();
$scope.request.status = 'pending';
$scope.facebook = {};
RFC_factory.get_profile()
.success(function(data){
  $scope.user = data;
  if(data.name != undefined)
  document.getElementById('username').innerHTML = data.name;
  $('#pic').attr('src', data.image);

});

  $scope.modifyRFC = function(id){
    $scope.request.time = new Date();
var json = JSON.stringify($scope.request,null, 4);
    RFC_factory.modify_form(id, json)
    .success(function(data){
          $scope.request = {};

      });
  };
  $scope.createRFC = function(id, mode){

    if(mode == 'modify'){
      $scope.request.impact = $('input[name="optradio"]:checked').val();
      $scope.request.result = $('input[name="optradio1"]:checked').val();
      $scope.request.implemented = $('input[name="optradio2"]:checked').val();
      $scope.request.duration = $('input[name="optradio3"]:checked').val();
      $scope.request.hard_soft = $('input[name="optradio4"]:checked').val();
      $scope.request.outage = $('input[name="optradio5"]:checked').val();
      $scope.request.test = $('input[name="optradio6"]:checked').val();
      $scope.request.SLA = $('input[name="optradio7"]:checked').val();
      $scope.request.status = 'pending';
      var json = JSON.stringify($scope.request,null, 4);
          RFC_factory.modify_form(id, json)
          .success(function(data){
                $scope.request = {};
            });
  window.top.location = "options.html";
    }
else{
  $scope.request.name= $('#username').html();
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

  if($scope.request.subject != null){

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
}
  };
  $scope.t_login = function(){
      RFC_factory.connectTwitter()
      .then(function(){
        if(RFC_factory.isReady())
          alert('twiter log in success');
      });


  };

  $scope.getCC = function(id){
var mode = getParameterByName('mode');
    RFC_factory.getCC(id)
    .then(function(obj){

$scope.request.subject = obj.data[0].subject;
$scope.request.result = obj.data[0].result;
$scope.request.outage = obj.data[0].subject;
$scope.request.test = obj.data[0].test;
$scope.request.benefits = obj.data[0].benefits;
$scope.request.risks = obj.data[0].risks;
// 0
if(obj.data[0].impact == 'Low'){
    $("[value=Low][name=optradio]").attr('checked', true);
}
else if(obj.data[0].impact == 'Medium'){
  $("[value=Medium][name=optradio]").attr('checked', true);
}
else if(obj.data[0].impact == 'High'){
  $("[value=High][name=optradio]").attr('checked', true);
}
// 1
if(obj.data[0].result == 'Yes'){
    $("[value=Yes][name=optradio1]").attr('checked', true);
}
else $("[value=No][name=optradio1]").attr('checked', true);
if(obj.data[0].implemented == 'Yes'){
    $("[value=Yes][name=optradio2]").attr('checked', true);
}
else $("[value=No][name=optradio2]").attr('checked', true);

if(obj.data[0].duration == 'Short'){
    $("[value=Low][name=optradio]").attr('checked', true);
}
else if(obj.data[0].duration == 'Standard'){
  $("[value=Medium][name=optradio]").attr('checked', true);
}
else if(obj.data[0].duration == 'Long'){
  $("[value=High][name=optradio]").attr('checked', true);
}
if(obj.data[0].outage == 'Yes'){
    $("[value=Yes][name=optradio5]").attr('checked', true);
}
else $("[value=No][name=optradio5]").attr('checked', true);
if(obj.data[0].test == 'Yes'){
    $("[value=Yes][name=optradio6]").attr('checked', true);
}
else $("[value=No][name=optradio6]").attr('checked', true);
if(obj.data[0].SLA == 'Yes'){
    $("[value=Yes][name=optradio7]").attr('checked', true);
}
else $("[value=No][name=optradio7]").attr('checked', true);
$scope.request.host = obj.data[0].host_name;
$scope.request.envir = obj.data[0].environment;
$scope.request.net = obj.data[0].affected_network;
if(obj.data[0].hard_soft == 'Software'){
  $("[value=Software]").attr('checked', true);
}
else $("[value=Hardware]").attr('checked', true);
$scope.request.plan = obj.data[0].implemented;
$scope.request.plan2 = obj.data[0].back_out_plan;
$scope.request.pi = obj.data[0].process;
$scope.request.ticket = obj.data[0].ticket_num;
$scope.request.mr = obj.data[0].event;
$scope.request.descriptions= obj.data[0].descriptions;
$scope.request.start_date = obj.data[0].start_date ;
$scope.request.end_date = obj.data[0].end_date;
if(mode == 'clone'){
  toastr.info('New Submission','Status',{
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
else{ 
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
}
    });
  };


}]);
// core
angular.module('rfcapp', ['rfcController','rfcService','ngRoute']);
