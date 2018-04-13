"use strict";

let {db} = require('../db');
let {message} = require('../helper');
let medicineModule = db.Medicine;

/**
 * 新增药品信息
 * @param {name 药品名称，isOTC 是否otc类药品， price 价格，status 状态，desc 备注 } req 
 * @param {*} res 
 */
exports.addMedicine = (req, res) => {
    let body = req.body;
    if (!body || !(body.name && !isNaN(body.price) && !isNaN(body.status) && !isNaN(body.isOTC))) {
        if(isNaN(body.isOTC) || body.status<0 || body.price<=0){
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

/**
 * 修改药品信息
 * @param {isOTC 是否otc，name 药品名称，price 价格， status 状态，desc 备注} req 
 * @param {*} res 
 */
exports.editMedicine = (req, res) => {
    let body = req.body;
    if (!body || !(body._id && body.name && !isNaN(body.price) && body.status && !isNaN(body.isOTC))) {
        if(isNaN(body.isOTC) || body.status<0 || body.price<=0){
            return res.json(message('params invalid'));
        }
    }
    medicineModule.findOne({name: body.name, status: body.status}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        if (data && data._id != body._id) {
            console.log(data);
            return res.json(message('medicine repeat'));
        }
        medicineModule.findByIdAndUpdate(body._id,{$set: {name: body.name, isOTC: body.isOTC, price: body.price, status: body.status, desc: body.desc}}, {new: true}).exec((err, data) => {
            if (err) {
                return res.json(message(err));
            }
            res.json(message(null,{error_code: 0, message: 'SUCCESS', result: data}));
        })
    })
}

/**
 * 通过id删除药品信息
 * @param {*} req 
 * @param {*} res 
 */
exports.delMedicine = (req, res) => {
    let body = req.body;
    medicineModule.remove({_id: body._id}).exec((err, data) => {
        if (err) {
            return res.json(message(err))
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
    })
}

/**
 * 通过id获取药品信息
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * 获取药物列表
 * @param {priceGT，priceLT 价格范围，status 状态，isOTC是否otc类，name 药品名称 } req 
 * @param {*} res 
 */
exports.getMedicineList = (req, res) => {
    let query = req.query;
    if(query.priceGT === '' || isNaN(query.priceGT) || query.priceGT<0){
        query.priceGT = 0;
    }
    if(query.priceLT === '' || isNaN(query.priceLT) || query.priceLT<0){
        query.priceLT = 999999;
    }
    if(query.isOTC == 999){
        delete query.isOTC
    }
    console.log(query);
    let queryObj = {}
    if (query.status) {
        queryObj.status = query.status
    }
    if(!isNaN(query.isOTC)) {
        queryObj.isOTC = query.isOTC
    }
    if(query.name) {
        queryObj.name = { $regex: query.name, $options: '$i' }
    }
    queryObj.price = { $gte: query.priceGT, $lte: query.priceLT }
    medicineModule.find(queryObj).limit(query.pageSize * 1).skip((query.pageNumber - 1) * 1 * query.pageSize).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        medicineModule.count(queryObj).exec((err, pageCount) => {
            if (err) {
                return res.json(message(err));
            }
            res.json(message(null, {error_code: 0, message: 'SUCCESS', result: {data, pageCount}}));
        })
        
    })
}
