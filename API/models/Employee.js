const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
    name: {
        type: String,
        default: "anon"
    },
    jobTitle: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required:true
    },
    email: {
        type: String,
        default: "email-address"
    },
    hireDate: Date
});

module.exports = mongoose.model('Employees', empSchema);