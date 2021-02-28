const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    team: {
        type: Array,
        required: false,
    },
}, { timestamps: true });

const Employee = new mongoose.model('Employee', employeeSchema);

module.exports = Employee;
