var mongoose = require('mongoose');

module.exports = mongoose.model('rfc',{
    subject: {type: String, default:''},
});
