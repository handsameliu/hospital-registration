"use strict";

let service = require('../service');
let test = service.test;

exports.addTest = (req, res) => {
    test.addTest(req, res);
}

exports.editTest = (req, res) => {
    test.editTest(req, res);
}

exports.delTest = (req, res) => {
    test.delTest(req, res);
}

exports.getTestById = (req, res) => {
    test.getTestById(req, res);
}

exports.getTestList = (req, res) => {
    test.getTestList(req, res);
}