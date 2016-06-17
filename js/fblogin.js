$( document ).ready(function() {
checkLoginState();
  // $('#logoutBtn').hide();
  // $('#userDetails').hide();
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

 function logIn() {
    FB.login(
         function(response) {
    if (response.status== 'connected') {
     FB.api('/me', function(response) {
         console.log(response);
           console.log('Good to see you, ' + response.name + '.');
           $('#loginBtn').hide();
           $('#logoutBtn').show();



        });
        FB.api("/me/picture?width=200&redirect=0&type=normal&height=200", function (response) {
           if (response && !response.error) {
             /* handle the result */
             console.log('PIC ::', response);
             $('#userPic').attr('src', response.data.url);
           }
        });
        window.top.location = "form.html";
    }
   }
   ,{
 scope: "email"
     }
  );
 }
function checkLoginState(){
 FB.getLoginStatus(function(response) {
   statusChangeCallback(response);
 });
}
var email = '';
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
      document.getElementById('username').innerHTML = 'Welcome, '+response.name;
       alert(response.email);
        email = response.email;

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

 function logOut() {
   FB.getLoginStatus(function(response) {
        if(response.status === 'connected'){
          FB.logout(function(response) {
           console.log('logout :: ', response);
           //Removing access token form localStorage.
           $('#loginBtn').show();
           $('#logoutBtn').hide();
           window.top.location = "login.html";

          });
        }
        else{
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
            console.log('User signed out.');
          });
        }


   });

}

 fbAsyncInit();
