'use strict';

var common = require('../../common/common');
var logger = common.getLogger('IndexService');
var DubboClient = require('../../dubbo/DubboClient');

var IndexService = function(){

    let _packageName = "";

    this.indexService = function(arg1,arg2){
        //let dubboVersion = common.getDubboVersion();
        //return DubboClient.invokeService(dubboVersion,_packageName,'servienave',[arg1,arg2]);
        return new Promise(function(resolve, reject){
                resolve("indexService");
        });
    }

};

module.exports = new IndexService();
