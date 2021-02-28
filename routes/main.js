const express = require('express');
const Employee = require('../models/employee');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/get-list', (req, res) => {
    Employee.find({})
        .limit(1500)
        .select({ _id: 0 })
        .exec()
        .then((result) => {
            res.render('index', { data: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(503).json({ status: 503, message: 'Service Unavailable. Please contact admin for support!' });
        });
});

router.post('/add-employee', (req, res) => {
    const employee = new Employee(req.body);
    // Employee.insertMany(employee)
    //     .then((result) => res.send(result))
    //     .catch((err) => console.log(err));
    employee.save()
        .then((result) => res.status(201).json({ status: 200, message: 'Successfully Added' }))
        .catch((err) => {
            console.log(err);
            res.json({ message: 'Something went wrong!' });
        });
});
module.exports = router;
