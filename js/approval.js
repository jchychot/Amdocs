
$( document ).ready(function() {


  var scope = angular.element(document.getElementById("admin")).scope();
    scope.$apply(function () {
    scope.getList();
    });

 });

 function fbAsyncInit() {
  FB.init({
   appId      : '249326552099211',
   status     : true, // check login status
   cookie     : true, // enable cookies to allow the server to access the session
   xfbml      : true  // parse XFBML
  });
 }
 // JS SDK - this will be loaded asynchronously
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function checkLoginState(){
 FB.getLoginStatus(function(response) {
   statusChangeCallback(response);
 });
}
var email2 = '';
 function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    $('#loginBtn').hide();
      FB.api('/me', { locale: 'en_US', fields: 'name, email' },function(response) {
      document.getElementById('username').innerHTML = response.name;

       });
       FB.api("/me/picture?width=200&redirect=0&type=normal&height=200", function (response) {
          if (response && !response.error) {
            $('#pic').attr('src', response.data.url);
          }
       });

    // Logged into your app and Facebook.

  } else if (response.status === 'not_authorized') {

    // The person is logged into Facebook, but not your app.
    // document.getElementById('status').innerHTML = 'Please log ' +
    //   'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    // document.getElementById('status').innerHTML = 'Please log ' +
    //   'into Facebook.';
     $('#logoutBtn').hide();
     $('#username').hide();
  }
}


 fbAsyncInit();
