var rfc = require('./model/rfc');

module.exports = function(app){

  //create entry
  app.post('/api/rfc', function(req,res){

      rfc.create({
          subject: req.body.text,
          done: false
      }, function(err, rfc){
          if(err)
            res.send(err);
            console.log("request summited");
      });

  });

  // application
  app.get('*', function(req, res){
      var path = require('path');
      res.sendFile(path.resolve(__dirname + '/../form.html'));
      console.log("static site sent");
  });



  
};
