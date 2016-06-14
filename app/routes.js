var rfc = require('./model/rfc');

module.exports = function(app){

  app.get('/api/rfc', function(req,res){
      rfc.find(function(err,rfc){
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
          impact: req.body.impact
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




};
