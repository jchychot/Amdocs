// module.exports = {
//   localUrl : 'mongodb://localhost/Amdocs'
// };
var mongohost = process.env.MONGOHOST || 'localhost';

module.exports = {

  localUrl : 'mongodb://' + mongohost + '/Amdocs'
};
