var mongoose = require('mongoose');

module.exports = mongoose.model('rfc',{
  text: {
      type: String,
      default: ''
  }
});
