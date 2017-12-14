'use strict';

const express = require('express');
const router = express.Router();

const userController = require("../controller/userController");

router.post('/signIn',userController.signIn);									/*登陆*/
router.post('/signOut',userController.signOut);                                 /*退出*/


module.exports = router;
