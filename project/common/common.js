'use strict';
var log4js = require('log4js');
var Cookies = require('cookies');

var common = {
    getLogger: function (name) {
        return log4js.getLogger(name);
    },
    getRedis: function(){
        return global.redis;
    },
    isDevMode : function(){
        return global.appConfig.envMode === "dev";
    },
    isTestMode : function(){
        return global.appConfig.envMode === "test";
    },
    isProductMode : function(){
        return global.appConfig.envMode === "product";
    },
    appMode: function(){
        return global.appConfig.envMode;
    },
    getContextPath : function(){
        return global.appConfig.contextPath;
    },
    getProtocol : function(){
        return global.appConfig.protocol;
    },
    getServerPort : function(){
        return global.appConfig.serverPort;
    },
    setCookie : function(key,content,req,res){
        var cookies = new Cookies( req, res);
        cookies.set(key,content,{maxAge:30*60*1000,httpOnly:false,secure:false,path:"/"});
    },
    getStaticResourceVersion : function(){
        return global.appConfig.staticResourceVersion;
    },
    getDubboVersion : function(){
        return global.appConfig.dubboVersion;
    }

};

module.exports = common;