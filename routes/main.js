const express = require('express');
const faker = require('faker');
const Employee = require('../models/employee');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/get-list', (req, res) => {
    const itemPerPage = 20;
    const page = 1;
    Employee.find({})
        .skip((itemPerPage * page) - itemPerPage)
        .limit(itemPerPage)
        .select({ _id: 0 })
        .exec()
        .then((result) => {
            Employee.countDocuments((err, count) => {
                if (err) {
                    res.status(500).json({ message: 'Something went wrong!' });
                }
                res.render('index', {
                    data: result,
                    current: page,
                    num: 1,
                    pages: Math.ceil(count / itemPerPage),
                    rootLink: '/api/get-list/',
                });

                // res.render('index', { data: result });
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(503).json({ status: 503, message: 'Service Unavailable. Please contact admin for support!' });
        });
});

router.get('/get-list/:page', (req, res) => {
    if (req.params.page === 1) {
        res.redirect('/api/get-list');
    }
    const itemPerPage = 20;
    const page = req.params.page || 1;
    Employee.find({})
        .skip((itemPerPage * page) - itemPerPage)
        .limit(itemPerPage)
        .select({ _id: 0 })
        .exec()
        .then((result) => {
            Employee.countDocuments((err, count) => {
                if (err) {
                    res.status(500).json({ message: 'Something went wrong!' });
                }
                res.render('index', {
                    data: result,
                    current: page,
                    num: (page === 1) ? 1 : ((page * itemPerPage) - itemPerPage) + 1,
                    pages: Math.ceil(count / itemPerPage),
                    rootLink: '/api/get-list/',
                });

                // res.render('index', { data: result });
            });
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
        .then(() => res.status(201).json({ status: 200, message: 'Successfully Added' }))
        .catch((err) => {
            console.log(err);
            res.json({ message: 'Something went wrong!' });
        });
});

router.get('/add-dummy', (req, res) => {
    for (let i = 0; i < 10; i += 1) {
        const employee = new Employee({
            name: faker.fake('{{name.firstName}} {{name.lastName}}'),
            role: 'Designer',
            department: 'Product 3',
            team: 'Design',
        });
        employee.save((err) => {
            if (err) { console.log(err); }
        });
    }
    res.redirect('/api');
});

module.exports = router;
