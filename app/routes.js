  var rfc = require('./model/rfc');
  var User = require('./model/user');
  var Feedback = require('./model/feedback');
  var acc_email ='';
  var acc_role ='';
  var acc_url = '/../options.html';
  var acc_name = '';
  function getRFC(res) {
      rfc.find(function (err, rfcs) {

          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err) {
              res.send(err);
          }

          res.json(rfcs); // return all todos in JSON format
      });
  }
  ;
module.exports = function(app, passport){


// routes for rfc app
  app.get('/api/rfc', isLoggedIn,function(req,res){
    // use facebook email by default
      rfc.find(function(err,rfc){
        if(req.user.role=='admin'){
          res.json(rfc);
        }
        else
            {
            res.send(err);
          }
      });
  } );

  app.get('/api/rfc/:_id', function(req, res){
    rfc.find({
         _id: req.params._id
        //  _id: req.params.email
    },function(err,rfc){
        if(err){
          res.send(err);
        }
      res.json(rfc);
    });

  });

  app.get('/api/rfc/:email/:_id', function(req, res){
    rfc.find({
         email: req.params.email,
        _id: req.params._id
    },function(err,rfc){
        if(err){
          res.send(err);
        }
      res.json(rfc);
    });

  });
// delete form
  app.delete('/api/rfc/:_id',isLoggedIn, function(req,res){
    rfc.remove({
      _id : req.params._id
    }, function(err, rfc){
      if(err){
        res.send(err);
      }
      getRFC(res);
    });
  });

// get users
  app.get('/api/user', function(req,res){
      User.find(function(err,rfc){
          if(err){
            res.send(err);
          }
        res.json(rfc);
      });
  } );
// get user profile
  app.get('/user/profile', isLoggedIn,function(req,res){
    User.findOne({email: req.user.email},function(err,user){
          if(err){
            res.send(err);
          }
          res.json(req.user);
    });
});
// create user
  app.post('/api/user', isLoggedIn, function(req,res){
    User.findOne({'email' : req.body.email}, function(err, user) {
          if (user) {
// caes 1  : self-come user
              if(user.company== undefined || user.role != 'admin'){
              user.company = req.body.company;
              user.role = req.body.role;
              user.save(function(err) {
                  if (err)
                      throw err;
              });
            }
// prevent changing roles
              return;
            }
      else{
      User.create({
          name : req.body.name,
          email : req.body.email,
          role : req.body.role,
          company : req.body.company,
          join_date: req.body.join
      },function(err,user){
        if(err)
          res.send(err);
      });
    }
  });

  });
  // create user feedback
    app.post('/api/feedback', isLoggedIn, function(req, res){
        Feedback.create({
          name: req.user.name,
          email: req.user.email,
          content: req.body.feedback
        }, function(err,user){
          if(err)
            res.send(err);
        });

    });
    //get user feedback
    app.get('/api/feedback', function(req, res){
      Feedback.find(function(err,feed){
          if(err){
            res.send(err);
          }
        res.json(feed);
      });
    });


  app.put('/api/user/:_id', function(req,res,next){
    User.findByIdAndUpdate(req.params._id, req.body, function (err, obj) {
          if (err) return next(err);
          res.json(obj);
  });
  });

  //create entry
  app.post('/api/rfc', isLoggedIn, function(req,res){
      rfc.create({
          subject: req.body.subject,
          descriptions: req.body.descriptions,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          name: req.user.name,
          email: req.user.email,
          impact: req.body.impact,
          benefits: req.body.benefits,
          risks: req.body.risks,
          result: req.body.result,
          implemented: req.body.implemented,
          duration: req.body.duration,
          categories: req.body.categories,
          host_name: req.body.host,
          environment: req.body.envir,
          affected_network: req.body.net,
          hard_soft: req.body.hard_soft,
          detail_plan: req.body.plan,
          back_out_plan: req.body.plan2,
          process: req.body.pi,
          outage: req.body.outage,
          test: req.body.test,
          SLA: req.body.SLA,
          event: req.body.mr,
          ticket_num: req.body.ticket_num,
          responsible_teams: req.body.rt,
          notify_teams: req.body.nt,
          status: req.body.status,
          creation_date: req.body.time,
          company: req.user.company
      }, function(err, rfc){
          if(err)
            res.send(err);
      });

  });

  // application
  app.get('/', function(req, res){
      var path = require('path');
      res.sendFile(path.resolve(__dirname + '/../login.html'));
  });


// find id and update
app.put('/api/rfc/:_id', function(req,res,next){
  rfc.findByIdAndUpdate(req.params._id, req.body, function (err, obj) {
        if (err) return next(err);
        res.json(obj);
        console.log(obj);
});
});

///////////////////routes for auth


app.get('/options', isLoggedIn, function(req, res) {
// use facebook email by default
  rfc.find({
       email: req.user.email
  },function(err,rfc){
      if(err){
        res.send(err);
      }
    res.json(rfc);
  });
});
app.get('/approval', isLoggedIn, function(req, res) {
// use facebook email by default
if(req.user.role == 'admin'){

  rfc.find(function(err,rfc){
      if(err){
        res.send(err);
      }
    res.json(rfc);
  });
}
else {
  alert('you are not an admin')
  res.send('you are not an admin!');
}
});
app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile','email'] }));
app.get('/auth/google', passport.authenticate('google', { scope : ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'] }));
app.get('/auth/twitter', passport.authenticate('twitter',  { scope : ['email'] }));
app.get('/auth/linkedin',passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));
// handle the callback after facebook has authenticated the user

app.get('/auth/linkedin/callback',
passport.authenticate('linkedin', {
    successRedirect : '/../options.html',
    failureRedirect : '/'
}));
//////////facebook
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/../options.html',
        failureRedirect : '/../error.html',
        failureFlash: true
    }));
app.get('/auth/google/callback',
          passport.authenticate('google', {
                  successRedirect : '/../options.html',
                  failureRedirect : '/'
          }));

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/../options.html',
        failureRedirect : '/'
    }));



// route for logging out
app.get('/logout', function(req, res) {

req.logout();
  res.redirect('/../login.html'); //Inside a callback… bulletproof!

    // req.logout();
    //   res.redirect('/../login.html');


});

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

// if user is authenticated in the session, carry on
if (req.isAuthenticated()){

    return next();
}
// if they aren't redirect them to the home page
res.redirect('/');
}
