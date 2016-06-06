var mongoose = require('mongoose');

module.exports = mongoose.model('rfc',{
    subject: String,
    detail: String,
    start: {type: Date, default: Date.now},
    end:{type: Date, default: Date.now},
});
