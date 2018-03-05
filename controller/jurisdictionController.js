"use strict";

let service = require('../service');
let jurisdiction = service.jurisdiction;

exports.addJurisdiction = (req, res) => {
    jurisdiction.addJurisdiction(req, res);
}

exports.editJurisdiction = (req, res) => {
    jurisdiction.editJurisdiction(req, res);
}

exports.delJurisdiction = (req, res) => {
    jurisdiction.delJurisdiction(req, res);
}

exports.getJurisdictionById = (req, res) => {
    jurisdiction.getJurisdictionById(req, res);
}

exports.getJurisdictionList = (req, res) => {
    jurisdiction.getJurisdictionList(req, res);
}