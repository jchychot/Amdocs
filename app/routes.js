var rfc = require('./model/rfc');

module.exports = function(app){

  //create entry
  app.post('/api/rfc', function(res,req){

      rfc.create({
          subject: req.body.subject,
          stime: req.body.s_time,
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

  });




};
