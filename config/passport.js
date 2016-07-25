var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var User       = require('../app/model/user');
var TwitterStrategy  = require('passport-twitter-email').Strategy;
var LinkedInStrategy  = require('passport-linkedin-oauth2').Strategy;
var configAuth = require('./auth');



module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
// =================
// LinkedIn ==========
// ======================================

passport.use(new LinkedInStrategy({

    // pull in our app id and secret from our auth.js file
    clientID         : configAuth.linkedinAuth.clientID,
    clientSecret    : configAuth.linkedinAuth.clientSecret,
    callbackURL     : configAuth.linkedinAuth.callbackURL,
     scope: ['r_emailaddress', 'r_basicprofile'],
     state: true
},

// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {

        // find the user in the database based on their facebook id
        User.findOne({ 'email' : profile.emails[0].value }, function(err, user) {

            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
                return done(err);

            if (user) {
              if(user.provider == undefined){
                user.provider = profile.provider;
                if(user.role != 'admin')
                user.role = 'user';
                if(profile.photos[0] == undefined){
                  user.image = '/../images/user.png'
                }
                else{
                user.image = profile.photos[0].value;
              }
                user.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.save(function(err) {
                    if (err)
                        throw err;
                });
              }
              return done(null, user);
            } else {
              //  creatUser(profile);
                var newUser            = new User();
                newUser.profile_id    = profile.id; // set the users facebook id
                newUser.token = token;
                newUser.name  = profile.name.givenName + ' ' + profile.name.familyName;
                newUser.email = profile.emails[0].value;
                if(profile.photos[0] == undefined){
                  newUser.image = '/../images/user.png'
                }
                else{
                newUser.image = profile.photos[0].value;
              }
                newUser.role = 'not-user';
                newUser.provider = profile.provider;
                // save our user to the database
                newUser.save(function(err) {
                    if (err)
                        throw err;

                    // if successful, return the new user
                    return done(null, newUser);
                });
            }

        });
    });

}));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields:  ['id', 'name', 'displayName', 'picture.type(large)', 'hometown', 'profileUrl', 'email']

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'email' : profile.emails[0].value }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    if(user.provider == undefined){
                      if(user.role != 'admin')
                      user.role = 'user';
                      user.provider = profile.provider;
                      if(profile.photos[0] == undefined){
                        user.image = '/../images/user.png'
                      }
                      else{
                      user.image = profile.photos[0].value;
                    }
                      user.name  = profile.name.givenName + ' ' + profile.name.familyName;
                      user.save(function(err) {
                          if (err)
                              throw err;
                      });
                    }
                    return done(null, user);
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    newUser.profile_id    = profile.id; // set the users facebook id
                    newUser.token = token; // we will save the token that facebook provides to the user
                    newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    if(profile.photos[0] == undefined){
                      newUser.image = '/../images/user.png'
                    }
                    else{
                    newUser.image = profile.photos[0].value;
                  }
                    newUser.role = 'not-user';
                    newUser.provider = profile.provider;
                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
        callbackURL     : configAuth.twitterAuth.callbackURL,


    },
    function(token, tokenSecret, profile, done) {
        console.log(profile);
        // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {

            User.findOne({ 'name': profile.username }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found then log them in
                if (user) {
                  if(user.provider == undefined){
                        if(user.role != 'admin')
                      user.role = 'user';
                    user.provider = profile.provider;
                    if(profile.photos[0] == undefined){
                      user.image = '/../images/user.png'
                    }
                    else{
                    user.image = profile.photos[0].value;
                  }
                    user.name  = profile.name.givenName + ' ' + profile.name.familyName;
                    user.save(function(err) {
                        if (err)
                            throw err;
                    });
                  }
                  return done(null, user);
                } else {
                    // if there is no user, create them
                    var newUser                 = new User();

                    // set all of the user data that we need
                    newUser.profile_id          = profile.id;
                    newUser.name    = profile.username;
                    newUser.token       = token;
                  // newUser.email    = profile.emails[0].value;
                  if(profile.photos[0] == undefined){
                    newUser.image = '/../images/user.png'
                  }
                  else{
                  newUser.image = profile.photos[0].value;
                }
                    newUser.role = 'not-user';
                    newUser.provider = profile.provider;
                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });

    });

    }));

    // =========================================================================
       // GOOGLE ==================================================================
       // =========================================================================
       passport.use(new GoogleStrategy({

           clientID        : configAuth.googleAuth.clientID,
           clientSecret    : configAuth.googleAuth.clientSecret,
           callbackURL     : configAuth.googleAuth.callbackURL,



       },
       function(request, token, refreshToken, profile, done) {

           process.nextTick(function() {

               // try to find the user based on their google id
               User.findOne({ 'email' : profile.emails[0].value }, function(err, user) {
                   if (err)
                       return done(err);

                   if (user) {

                     if(user.provider == undefined){
                           if(user.role != 'admin')
                         user.role = 'user';
                       user.provider = profile.provider;
                       if(profile.photos[0] == undefined){
                         user.image = '/../images/user.png'
                       }
                       else{
                       user.image = profile.photos[0].value;
                     }
                       user.name  = profile.name.givenName + ' ' + profile.name.familyName;
                       user.save(function(err) {
                           if (err)
                               throw err;
                       });
                     }
                     return done(null, user);
                   } else {
                       // if the user isnt in our database, create a new user
                       var newUser          = new User();

                       newUser.id    = profile.id;
                       newUser.token = token;
                       newUser.name  = profile.displayName;
                       newUser.email = profile.emails[0].value; // pull the first email
                       newUser.role = 'not-user';
                       newUser.provider = profile.provider;
                       if(profile.photos[0] == undefined){
                         newUser.image = '/../images/user.png'
                       }
                       else{
                       newUser.image = profile.photos[0].value;
                     }
                       // save the user
                       newUser.save(function(err) {
                           if (err)
                               throw err;
                           return done(null, newUser);
                       });
                   }
               });
           });

       }));



};
