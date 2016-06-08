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
          text: req.body.text,
          done: false
      }, function(err, rfc){
          if(err)
            res.send(err);
      });

  });

  // application
  app.get('*', function(req, res){
      var path = require('path');
      res.sendFile(path.resolve(__dirname + '/../form.html'));
      console.log("static site sent");
  });




};
