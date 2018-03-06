"use strict";

let {db} = require('../db');
let {message} = require('../helper');
let medicineModule = db.Medicine;

exports.addMedicine = (req, res) => {
    let body = req.body;
    if (!body || !(body.name && body.isOTC && body.price && body.status && body.desc)) {
        if(isNaN(body.isOTC) || body.status<0 || body.price<0){
            return res.json(message('params invalid'));
        }
    }
    medicineModule.findOne({name: body.name}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        if (data) {
            console.log(data);
            return res.json(message('medicine repeat'));
        }
        medicineModule.create(body, (err, data) => {
            if (err) {
                return res.json(message(err));
            }
            res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
        })
    })
}
exports.editMedicine = (req, res) => {
    let body = req.body;
    if (!body || !(body._id && body.isOTC && body.name && body.price && body.status && body.desc)) {
        if(isNaN(body.isOTC) || body.status<0 || body.price<0){
            return res.json(message('params invalid'));
        }
    }
    medicineModule.findByIdAndUpdate(body._id,{$set: {name: body.name, isOTC: body.isOTC, price: body.price, status: body.status, desc: body.desc}}, {new: true}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null,{error_code: 0, message: 'SUCCESS', result: data}));
    })
}
exports.delMedicine = (req, res) => {
    let body = req.body;
    medicineModule.remove({_id: body._id}).exec((err, data) => {
        if (err) {
            return res.json(message(err))
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
    })
}
exports.getMedicineById = (req, res) => {
    let body = req.params;
    if(!body.medicineId){
        return res.json(message('params invalid'));
    }
    medicineModule.findById(body.medicineId).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    })
}
exports.getMedicineList = (req, res) => {
    let query = req.query;
    if(query.priceGT === ''){
        query.priceGT = 0;
    }
    if(query.priceLT === ''){
        query.priceLT = 100000;
    }
    console.log(query);
    medicineModule.find({status: query.status, isOTC: query.isOTC, name: {$regex: query.name, $options: '$i'}, price: { $gt: query.priceGT, $lt: query.priceLT }}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    })
}
