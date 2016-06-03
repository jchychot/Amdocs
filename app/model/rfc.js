var mongoose = require('mongoose');

module.exports = mongoose.model('Rfc',{
    subject: String,
    detail: String,
    start: {type: Date, default: Date.now},
    end:{type: Date, default: Date.now},
}); 
