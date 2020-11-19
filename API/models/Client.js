const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        default: "anon"
    },
    password: {
        type: String,
        required: true
    },
    dateEnrolled: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Clients', clientSchema);