//set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var mongohost = process.env.MONGOHOST || 'localhost';
var database = require('./config/database');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 8080;
var session      = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');
//configuration
mongoose.connect('mongodb://' + mongohost + '/Amdocs');
app.set('json spaces', 4);
app.use(express.static(__dirname)); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));
// required for passport
app.use(session({ secret: 'amdocsinternship' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
// routes for api
require('./app/routes.js')(app);
// passport configuration
require('./config/passport')(passport);
//listen
app.listen(port);
console.log("App listening on port" + port);
