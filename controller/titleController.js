"use strict";

let service = require('../service');
let title = service.title;

exports.addTitle = (req, res) => {
    title.addTitle(req, res);
}

exports.editTitle = (req, res) => {
    title.editTitle(req, res);
}

exports.delTitle = (req, res) => {
    title.delTitle(req, res);
}

exports.getTitleById = (req, res) => {
    title.getTitleById(req, res);
}

exports.getTitleList = (req, res) => {
    title.getTitleList(req, res);
}