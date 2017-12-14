'use strict';

exports.signIn = (req,res,next)=>{
	res.render('signIn',{title: '登陆'});
};
exports.signUp = (req,res,next)=>{
	res.render('signUp',{title: '注册'});
};
exports.index = (req,res,next)=>{
	res.render('index',{title: '首页'});
};
exports.articleById = (req,res,next)=>{
	res.render('details',{title: '帖子详情'});
};
exports.subject = (req,res,next)=>{
	res.render('topic',{title: '话题'});
};
exports.adminFindAll = (req,res,next)=>{
	res.render('backstage',{title: '后台'});
};
exports.write = (req,res,next) => {
	res.render('write',{title:'输入'});
}
