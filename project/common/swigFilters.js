'use strict';
var log4js = require('log4js');
var log = log4js.getLogger("common.swigFilters");
var common = require('./common');
var constants = require('./constants');
var crypto = require('crypto');
/**添加filter请保持格式 **/
var swigFilters =[
    {
        name:"importJS",
        func:function(input){
            let scripts = input.split(",")
                ,createdScripts = []
                ;
                let versionId = "_" + common.getStaticResourceVersion();
                for(let i =0,l = scripts.length; i<l;i++){
                    createdScripts.push('<script type="text/javascript" src="dist/js/',crypto.createHash('md5').update(scripts[i]+versionId).digest('hex'),'.js" ></script>');
                }
                return createdScripts.join('');
        }
    },
    {
        name:"importCSS",
        func:function(input){
            let links = input.split(",")
                ,createdLinks = [],
                destPath = "../dist/css/"
                ;
                let versionId = "_" + common.getStaticResourceVersion();
            for(let i =0,l = links.length; i<l;i++){
                createdLinks.push('<link rel="stylesheet" href="dist/css/',crypto.createHash('md5').update(links[i]+versionId).digest('hex'),'.css" />');
            }
            return createdLinks.join('');
        }
    },
    {
        name:"nowTime",
        func:function(){
            return new Date().getTime();
        }
    },
    {
        name:"devMode",
        func:function(){
            return common.isDevMode();
        }
    },
    {
        name:"ctxPath",
        func:function(){
            return common.getContextPath();
        }
    },
    {
        name:"protocol",
        func:function(){
            return common.getProtocol();
        }
    },
    {
        name:"serverPort",
        func:function(){
            return common.getServerPort();
        }
    },
    {
        name:"constant",
        func:function(key){
            return constants.getConstant(key);
        }
    }
];
module.exports = swigFilters;