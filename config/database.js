var mongohost = process.env.MONGOHOST || 'localhost';
  console.log("Host is " + mongohost);

module.exports = {

  localUrl : 'mongodb://' + mongohost + '/Amdocs'
};
