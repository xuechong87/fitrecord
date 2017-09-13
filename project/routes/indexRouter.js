'use strict';
var express = require('express');
var router = express.Router();
var common = require('../common/common');
var logger = common.getLogger('index-router');
var indexBiz = require('../biz/index/indexBiz');

router.get('/',function(req, res, next) {
    indexBiz.indexbizFunc("a","b");
    res.render('index',{req:req});
});

module.exports = router;
