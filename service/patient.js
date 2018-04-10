"use strict";

let {db} = require('../db');
let {message} = require('../helper');
let patientModule = db.Patient;

/**
 * 新增患者基本信息
 * @param {name 姓名，cardId 身份证号，socialSecurityId 社保号，address 地址，mobile 手机号，userId 创建人} req 
 * @param {*} res 
 */
exports.addPatient = (req, res) => {
    let body = req.body;
    // && body.socialSecurityId 
    if (!body || !(body.name && body.cardId && body.address && body.mobile && body.userId)) {
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

/**
 * 通过id 修改患者信息
 * @param {name 姓名，cardId 身份证号，socialSecurityId 社保号，address 地址，mobile 手机号，desc 备注} req 
 * @param {*} res 
 */
exports.editPatient = (req, res) => {
    if(!req.body._id){
        return res.json(message('params invalid'));
    }
    let body = req.body;
    patientModule.findByIdAndUpdate(body._id, {$set: {name: body.name, cardId: body.cardId, socialSecurityId: body.socialSecurityId, address: body.address, mobile: body.mobile, desc: body.desc}}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
    })
}

/**
 * 通过id获取患者信息
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * 搜索 患者基本信息
 * @param {name 姓名，cardId 身份证号，socialSecurityId 社保号} req 
 * @param {*} res 
 */
exports.getPatientList = (req, res) => {
    let query = req.query;
    let queryObj = {};
    if(query.name){
        queryObj.name = {$regex: query.name, $options: '$i'}
    }
    if(query.cardId){
        queryObj.cardId = query.cardId
    }
    if(query.socialSecurityId){
        queryObj.socialSecurityId = query.socialSecurityId;
    }
    patientModule.find(queryObj).exec((err, data) => {
        if(err){
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    })
}