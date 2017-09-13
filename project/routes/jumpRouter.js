'use strict';
var express = require('express');
var router = express.Router();
var common = require('../common/common');
router.get('/',function(req, res, next) {
    res.redirect('/' + common.getContextPath());
});

module.exports = router;
