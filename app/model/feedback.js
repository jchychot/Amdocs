var mongoose = require('mongoose');

module.exports = mongoose.model('feedback',{

  name : String,
  email : String,
  content: String

});
