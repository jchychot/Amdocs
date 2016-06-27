  var rfc = require('./model/rfc');

module.exports = function(app){
// routes for rfc app
  app.get('/api/rfc', function(req,res){
      rfc.find(function(err,rfc){
          if(err){
            res.send(err);
          }
        res.json(rfc);
      });
  });

  app.get('/api/rfc/:email', function(req, res){
    rfc.find({
         email: req.params.email
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


  //create entry
  app.post('/api/rfc', function(req,res){
      rfc.create({
          subject: req.body.subject,
          descriptions: req.body.descriptions,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          name: req.body.name,
          email: req.body.email,
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
          status: req.body.status
      }, function(err, rfc){
          if(err)
            res.send(err);
      });

  });

  // application
  app.get('*', function(req, res){
      var path = require('path');
      res.sendFile(path.resolve(__dirname + '/../login.html'));
      console.log("static site sent");
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

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

// route for logging out
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

// if user is authenticated in the session, carry on
if (req.isAuthenticated())
    return next();

// if they aren't redirect them to the home page
res.redirect('/');
}

};
