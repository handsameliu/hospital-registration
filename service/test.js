"use strict";

let {db} = require('../db');
let {message} = require('../helper');
let testModule = db.Test;

/**
 * 新增体检项
 * @param {departmentId 科室，name 体检项名称，status 状态，price 价格，desc 备注} req 
 * @param {*} res 
 */
exports.addTest = (req, res) => {
    let body = req.body;
    if(!body || !(body.name && body.departmentId && !isNaN(body.price) && !isNaN(body.status))){
        if(body.status < 0 || body.price < 0){
            return res.json(message('params invalid'));
        }
    }
    testModule.findOne({name: body.name, departmentId: body.departmentId}).exec(function(err, data){
        if(err){
            return res.json(message(err));
        }
        if(data){
            return res.json(message('testItem repeat'));
        }
        testModule.create(body, (err, data) => {
            if (err) {
                return res.json(message(err))
            }
            res.json(message(null, {error_code: 0 ,message:'SUCCESS'}));
        })
    })
}

/**
 * 修改体检项信息
 * @param {departmentId 科室，name 体检项名称，status 状态，price 价格，desc备注} req 
 * @param {*} res 
 */
exports.editTest = (req, res) => {
    let body = req.body;
    if(!body || !(body._id || body.name || body.departmentId || !isNaN(body.price) || body.status || body.desc)){
        return res.json(message('params invalid'));
    }
    testModule.findOne({name: body.name, departmentId: body.departmentId}).exec(function(err, data){
        if(err){
            return res.json(message(err));
        }
        if(data && data._id != body._id){
            return res.json(message('testItem repeat'));
        }
        testModule.findByIdAndUpdate(body._id, {$set : {name: body.name, departmentId: body.departmentId, price: body.price, status: body.status, desc: body.desc}}, {new: true}).exec((err, data) => {
            if (err) {
                return res.json(message(err));
            }
            res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
        })
    })
}

/**
 * 通过id删除体检项
 * @param {*} req 
 * @param {*} res 
 */
exports.delTest = (req, res) => {
    let body = req.body;
    if (!body._id) {
        return res.json(message('params invalid'))
    }
    testModule.remove({_id: body._id}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
    })
}

/**
 * 通过id获取体检项信息
 * @param {*} req 
 * @param {*} res 
 */
exports.getTestById = (req, res) => {
    let testId = req.params.testId;
    if(!testId){
        return res.json(message('params invalid'));
    }
    testModule.findById(testId).populate({path: 'departmentId', select: "_id name address desc"}).exec((err, data) => {
        if(err){
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    })
}

/**
 * 获取体检项
 * @param {departmentId 科室，priceGT priceLT 价格区间，name 体检项名称，status 状态，price 价格} req 
 * @param {*} res 
 */
exports.getTestList = (req, res) => {
    let query = req.query, whereObj = {};
    if (query.departmentId && query.departmentId != '9999') {
        whereObj.departmentId = query.departmentId;
    }
    if(query.priceGT === '' || isNaN(query.priceGT) || query.priceGT < 0){
        query.priceGT = 0;
    }
    if (query.priceLT=== '' || isNaN(query.priceLT) || query.priceLT < 0) {
        query.priceLT = 200000;
    }
    if(query.name){
        whereObj.name = {$regex: query.name, $options: '$i'};
    }
    if(query.status){
        whereObj.status = query.status;
    }
    if(query.desc){
        whereObj.desc = query.desc;
    }
    whereObj.price ={$gte: query.priceGT, $lte: query.priceLT};
    testModule.find(whereObj).populate('departmentId',"_id name address desc").exec((err, data) => {
        if (err) {  
            console.log(err);
            return res.json(message(err));
        }
        testModule.count(whereObj).exec((err, pageCount) => {
            if (err) {
                return res.json(message(err));
            }
            res.json(message(null, {error_code: 0, message: 'SUCCESS', result: {data, pageCount}}));
        })
    })
}