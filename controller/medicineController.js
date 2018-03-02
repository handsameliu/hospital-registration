"use strict";

let service = require('../service');
let medicine = service.medicine;

exports.addMedicine = (req, res) => {
    medicine.addMedicine(req, res);
}

exports.editMedicine = (req, res) => {
    medicine.editMedicine(req, res);
}

exports.delMedicine = (req, res) => {
    medicine.delMedicine(req, res);
}

exports.getMedicineById = (req, res) => {
    medicine.getMedicineById(req, res);
}

exports.getMedicineList = (req, res) => {
    medicine.getMedicineList(req, res);
}