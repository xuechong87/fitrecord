'use strict';
var Cookies = require('cookies');
var common = require('../common/common');
var logger = common.getLogger('middleware.RedisCookiesSession');

module.exports = function (req, res, next) {
    var cookies = new Cookies( req, res);
    var loginToken = cookies.get("token");
    if(loginToken){
        common.getRedis().get("TOKEN_"+loginToken,function(err,data){
            if(data){
                req.userInfo = JSON.parse(data);
            }
            next();

            if(data){//已登录 刷新redis存活时间
                common.getRedis().expire("TOKEN_"+loginToken,1800,function(err,data){
                    if(err){
                        logger.error(err);
                    }
                });
            }
        });
    }else{
        next();
    }

};
