"use strict";

let {db} = require('../db');
let {message} = require('../helper');
let testModule = db.Test;

exports.addTest = (req, res) => {
    let body = req.body;
    if(!body || !(body.name && body.departmentId && body.price && body.status && body.desc)){
        if(body.status < 0){
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
exports.editTest = (req, res) => {
    let body = req.body;
    if(!body || !(body._id || body.name || body.departmentId || body.price || body.status || body.desc)){
        return res.json(message('params invalid'));
    }
    testModule.findByIdAndUpdate(body._id, {$set : {name: body.name, departmentId: body.departmentId, price: body.price, status: body.status, desc: body.desc}}, {new: true}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    })
}
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
exports.getTestList = (req, res) => {
    let query = req.query, whereObj = {};
    if (query.departmentId) {
        whereObj.departmentId = query.departmentId;
    }
    if(query.priceGT === ''){
        query.priceGT = 0;
    }
    if (query.priceLT==='') {
        query.priceLT = 200000;
    }
    if(query.name !== ''){
        whereObj.name = {$regex: query.name, $options: '$i'};
    }
    if(query.status !== ''){
        whereObj.status = query.status;
    }
    whereObj.price ={$gte: query.priceGT, $lte: query.priceLT};
    testModule.find(whereObj).populate('departmentId',"_id name address desc").exec((err, data) => {
        if (err) {  
            console.log(err);
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    })
}