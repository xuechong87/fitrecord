'use strict';

var common = require('../../common/common');
var logger = common.getLogger('biz.index.IndexBiz');

var IndexService = require("../../service/index/indexService");

var IndexBiz = function(){

    this.indexbizFunc = function(arg1,arg2){
        return new Promise(function(resolve, reject){
            IndexService.indexService(arg1,arg2).then(function(result){

                resolve(result);
            }).catch(function(err){
                logger.error("this is indexBiz :catch"+err);
                logger.error(err);
                reject(err);
            });
        });

    }

};

module.exports = new IndexBiz();
