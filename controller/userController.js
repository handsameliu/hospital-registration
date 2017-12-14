'use strict';

let service = require('../service');
let user = service.user;

exports.signIn = (req,res)=>{
	user.signIn(req,res);
};
exports.signUp = (req,res)=>{
	user.signUp(req,res);
};
exports.signOut = (req,res)=>{
	user.signOut(req,res);
};
exports.search = (req,res)=>{
	user.search(req,res);
};