var mongohost = process.env.MONGOHOST || 'localhost:8080';
var proxyhost = process.env.PROXYHOST || '54.242.60.137';
// need to change in Oauth when we actually test the app
module.exports = {

    'facebookAuth' : {
        'clientID'      : '249326552099211', // your App ID
        'clientSecret'  : '6550dcdc1bf3834b3ab16cb36ca93f63', // your App Secret
    //    'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
      'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'xGPl7K27g0YilgHsua2qy54J5',
        'consumerSecret'    : 'HkX4lg79iRvQCUr4EnAXYUWQ6ruH6B42fihqOjsmlyJfT2ofzS',
      //  'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
          'callbackURL'   : 'http://'+mongohost+'/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '564236928671-crejp57oa63oc44jjjnbf7jqj9qes9t9.apps.googleusercontent.com',
        'clientSecret'  : 'fER8MmjEMFbIH63-891knq9r',
  //      'callbackURL'   : 'http://localhost:8080/auth/google/callback'
      'callbackURL'   : 'http://'+mongohost+'/auth/google/callback'
    },
    'linkedinAuth' : {
      'clientID'      : '77tocnxazjocbd',
      'clientSecret'  : '5Lckg1T13cTdliUt',
    'callbackURL'   : 'http://'+proxyhost+'/auth/linkedin/callback'
    }

};
