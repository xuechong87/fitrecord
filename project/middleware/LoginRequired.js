'use strict';

var common = require('../common/common');
var logger = common.getLogger('middleware.LoginRequired');
var Utils = require('../common/util');

module.exports = function (req, res, next) {

    let userInfo = req.userInfo;

    if(userInfo){
        next();
    }else{
        if (req.accepts(['html', 'json']) === 'html') {
            let reqPath = req._parsedOriginalUrl._raw;

            if(reqPath.length > 1){
                reqPath = reqPath.substr(1,reqPath.length -1);
            }else{
                reqPath = '/';
            }

            let encodedPath = Utils.base64UrlSafeEncode(reqPath);
            let jump;
            if(common.isDevMode()){
                jump = "devloginpath";
            }else{

                jump = "productloginpath";
            }

            //return res.render('error', { message: encodedPath, req:req});
            return res.render('jump', { jump: jump});
        }
        res.status(401).end();
    }

};