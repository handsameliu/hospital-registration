"use strict";

let {db} = require('../db');
let {message} = require('../helper');
let patientModule = db.Patient;

exports.addPatient = (req, res) => {
    let body = req.body;
    if (!body || !(body.name && body.cardId && body.socialSecurityId && body.address && body.mobile && body.userId)) {
        return res.json(message('params invalid'));
    }
    patientModule.findOne({cardId: body.cardId}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        if (data) {
            return res.json(message('patient repeat'));
        }
        patientModule.create(body, (err, data) => {
            if (err) {
                return res.json(message('addPatient error', err));
            }            
            res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
        })
    })
}
exports.editPatient = (req, res) => {
    if(!req.body._id){
        return res.json(message('params invalid'));
    }
    let body = req.body;
    patientModule.findByIdAndUpdate(body._id, {$set: {name: body.name, cardId: body.cardId, socialSecurityId: body.socialSecurityId, address: body.address, mobile: body.mobile, userId: body.userId, desc: body.desc}}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
    })
}
exports.getPatientById = (req, res) => {
    if(!req.params.patientId){
        return res.json(message('params invalid'));
    }
    patientModule.findById(req.params.patientId).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code:0, message: 'SUCCESS', result: data}));
    })
}
exports.getPatientList = (req, res) => {
    patientModule.find({name: {$regex: req.query.name, $options: '$i'}, cardId: {$regex: req.query.cardId,$options: '$i'}, socialSecurityId: {$regex: req.query.socialSecurityId,$options: '$i'}}).exec((err, data) => {
        if(err){
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    })
}