'use strict';

let service = require('../service');
let article = service.article;

exports.findAll = (req,res)=>{
	article.findAll(req,res);
};
exports.findBySubject = (req,res)=>{
	article.findBySubject(req,res);
};
exports.findArticleById = (req,res)=>{
	article.findArticleById(req,res);
};
exports.saveArticle = (req,res)=>{
	article.saveArticle(req,res);
};
exports.saveComment = (req,res)=>{
	article.saveComment(req,res);
};
exports.findCommentByArticleId = (req,res)=>{
	article.findCommentByArticleId(req,res);
};
exports.search = (req,res)=>{
	article.search(req,res);
};
exports.update = (req,res)=>{
	article.update(req,res);
};