"use strict";

let service = require('../service');
let module = service.module;

exports.addModule = (req, res) => {
    module.addModule(req, res);
}

exports.editModule = (req, res) => {
    module.editModule(req, res);
}

exports.delModule = (req, res) => {
    module.delModule(req, res);
}

exports.getModuleById = (req, res) => {
    module.getModuleById(req, res);
}

exports.getModuleList = (req, res) => {
    module.getModuleList(req, res);
}