var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var User       = require('../app/model/user');
var TwitterStrategy  = require('passport-twitter').Strategy;
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
        User.findOne({ 'linkedin.id' : profile.id }, function(err, user) {

            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
                return done(err);

            if (user) {
                return done(null, user); // user found, return that user
            } else {

                var newUser            = new User();
                newUser.linkedin.id    = profile.id; // set the users facebook id
                newUser.linkedin.token = token;
                newUser.linkedin.name  = profile.name.givenName + ' ' + profile.name.familyName;
                newUser.linkedin.email = profile.emails[0].value;
                newUser.linkedin.image = profile.photos[0].value;
                newUser.linkedin.role = 'user';
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
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    newUser.facebook.image = profile.photos[0].value;
                    newUser.facebook.role = 'user';
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
        callbackURL     : configAuth.twitterAuth.callbackURL

    },
    function(token, tokenSecret, profile, done) {

        // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {

            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser                 = new User();

                    // set all of the user data that we need
                    newUser.twitter.id          = profile.id;
                    newUser.twitter.name    = profile.username;
                    newUser.twitter.token       = token;
              //     newUser.twitter.email    = profile.emails[0].value;
                    newUser.twitter.displayName = profile.displayName;
                    newUser.twitter.image = profile.photos[0].value;
                    newUser.twitter.role = 'user';
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
               User.findOne({ 'google.id' : profile.id }, function(err, user) {
                   if (err)
                       return done(err);

                   if (user) {

                       // if a user is found, log them in
                       return done(null, user);
                   } else {
                       // if the user isnt in our database, create a new user
                       var newUser          = new User();

                       newUser.google.id    = profile.id;
                       newUser.google.token = token;
                       newUser.google.name  = profile.displayName;
                       newUser.google.email = profile.emails[0].value; // pull the first email
                       newUser.google.role = 'user';

                       newUser.google.image = profile.photos[0].value;
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
