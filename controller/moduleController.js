"use strict";

let service = require('../service');
let modular = service.modular;

exports.addModule = (req, res) => {
    modular.addModule(req, res);
}

exports.editModule = (req, res) => {
    modular.editModule(req, res);
}

exports.delModule = (req, res) => {
    modular.delModule(req, res);
}

exports.getModuleById = (req, res) => {
    modular.getModuleById(req, res);
}

exports.getModuleList = (req, res) => {
    modular.getModuleList(req, res);
}