'use strict';

exports.signIn = (req,res,next)=>{
	console.log('signIn----');
	res.render('signIn',{title: '登陆'});
};
exports.index = (req,res,next)=>{
	console.log('index----');
	res.render('index',{title: '首页'});
};