"use strict";

let service = require('../service');
let register = service.register;

exports.addRegister = (req, res) => {
    register.addRegister(req, res);
}

exports.editRegister = (req, res) => {
    register.editRegister(req, res);
}

exports.delRegister = (req, res) => {
    register.delRegister(req, res);
}

exports.getRegisterById = (req, res) => {
    register.getRegisterById(req, res);
}

exports.getRegisterList = (req, res) => {
    register.getRegisterList(req, res);
}