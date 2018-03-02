"use strict";

let service = require('../service');
let department = service.department;

exports.addDepartment = (req, res) => {
    department.addDepartment(req, res);
}

exports.editDepartment = (req, res) => {
    department.editDepartment(req, res);
}

exports.delDepartment = (req, res) => {
    department.delDepartment(req, res);
}

exports.getDepartmentById = (req, res) => {
    department.getDepartmentById(req, res);
}

exports.getDepartmentList = (req, res) => {
    department.getDepartmentList(req, res);
}
