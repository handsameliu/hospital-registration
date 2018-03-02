"use strict";

let service = require('../service');
let patient = service.patient;

exports.addPatient = (req, res) => {
    patient.addPatient(req, res);
}

exports.editPatient = (req, res) => {
    patient.editPatient(req, res);
}

exports.getPatientById = (req, res) => {
    patient.getPatientById(req, res);
}

exports.getPatientList = (req, res) => {
    patient.getPatientList(req, res);
}