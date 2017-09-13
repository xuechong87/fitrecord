'use strict';
var log4js = require('log4js');
var Cookies = require('cookies');
var common = require('./common');

var logger = log4js.getLogger("common.Utils");

var URLSafeBase64 = require('urlsafe-base64');

var Utils = {

    base64UrlSafeEncode : function (originStr) {
        var buf = new Buffer(originStr);
        return URLSafeBase64.encode(buf);
    },
    base64UrlSafeDecode : function (originStr) {
        //var buf = new Buffer(originStr);
        return URLSafeBase64.decode(originStr);
    },

    base64UrlSafeValidate : function (originStr) {
        //var buf = new Buffer(originStr);
        return URLSafeBase64.validate(originStr);
    },

    /**
     * redis锁
     * @param key
     * @param createlock 检查同时是否创建锁(如果可以创建)
     */
    redisTimeLock : function(key,createlock,ttlTime){
        return new Promise((resolve, reject)=>{
            let reids = common.getRedis();
            redis.ttl(key,(err,ttlResult)=>{
                if(err){
                    logger.error(err);
                    reject(err);
                }
                let result = {available:ttlResult<=0,timeLeft:ttlResult};
                if(ttlResult<=0&&createlock){
                    reids.set(key,'1','EX',ttlTime,function(err,data){
                        if(err){
                            logger.error(err);
                            reject(err);
                        }else {
                            result.timeLeft = ttlTime;
                            resolve(result);
                        }
                    });
                }else{
                    resolve(result);
                }
            });
        });
    }



};

module.exports = Utils;