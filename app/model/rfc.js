var mongoose = require('mongoose');

module.exports = mongoose.model('rfc',{
  subject: {
      type: String,
      default: ''
  },
  descriptions: {
    type: String,
    default: ''
  },
  start_date: {
    type: Date,
    default: Date.now
  },
  end_date: {
    type: Date,
    default: Date.now
  }
});
