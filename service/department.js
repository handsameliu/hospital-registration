'use strict';

let {db} = require('../db');
let {message} = require('../helper');
let departmentService = db.Department;


exports.addDepartment = (req, res) => {
    let body = req.body;
    if(!body || !(body.name && body.address)){
        return res.json(message('params invalid'));
    }
    departmentService.findOne({name: body.name, address: body.address}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        if (data) {
            return res.json(message('department repeat'));
        }
        departmentService.create(body, (error, data) => {
            console.log(error);
            if(error){
                return res.json(message('addDepartment error', error));
            }
            res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
        })
    });
}