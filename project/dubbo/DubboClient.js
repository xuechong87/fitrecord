'use strict';

let common = require('../common/common');
let logger = common.getLogger('dubbo.DubboClient');
let zookeeper = require('node-zookeeper-client');
let URL = require("url");
let QS = require("querystring");
let Proxy = require('./hessian/HessianProxy').Proxy;

let ROOT_NODE = 'dubbo';
let PROVIDERS = 'providers';

var DubboClient = function(){

    let _protocol = "hessian:";

    function getRandomService(serviceList){
        let serviceIndex = 0;
        if(serviceList.length>1){
            serviceIndex = parseInt(Math.random()*serviceList.length);
        }
        return serviceList[serviceIndex];
    }

    //check serviceUal usable and convert zk service info to dubbo uri
    function buildServiceList(serviceUrlStrList,serviceVersion){

        let serviceList = [];
        for(let i in serviceUrlStrList){

            let serviceUrlStr = serviceUrlStrList[i];
            let uri = URL.parse(decodeURIComponent(serviceUrlStr,"utf-8"));
            if(uri.protocol == _protocol){
                if (uri.search){
                    let queryObj = QS.parse(uri.search.substr(1,uri.search.length));
                    if(queryObj.version==serviceVersion){
                        let servicePath = "http://" + uri.host  + "/" + queryObj.interface;
                        serviceList.push(servicePath);
                    }
                }
            }

        }
        return serviceList;
    }


    //return a Promise that will invoke the target service
    this.invokeService = function(serviceVersion,packageName,methodName,args){

        return new Promise(function(resolve, reject){

            let zkClient = global.zkclient;
            let serviceProvidersPath ='/' + ROOT_NODE + '/' + encodeURIComponent(packageName) + '/' + PROVIDERS;

            zkClient.exists(serviceProvidersPath, function (checkExistsError, stat) {

                if (checkExistsError) {//path not exists, the target service maybe down or not published
                    logger.error("check path exists err is\r\n %s",checkExistsError.stack);
                    logger.error('the zk client state is %s',zkClient.state);
                    reject(checkExistsError);
                    return;
                }

                if (stat) {

                    zkClient.getChildren(serviceProvidersPath,function(getChildrenErr,serviceUrlStrList){

                        if(getChildrenErr){
                            logger.error("invoke service getChildrenErr  : ");
                            logger.error(getChildrenErr);
                            reject(getChildrenErr);
                            return ;
                        }

                        let serviceList = buildServiceList(serviceUrlStrList,serviceVersion);
                        if(serviceList.length<=0){
                            logger.error("invoke service no available service for : %s",packageName);
                            reject("invoke service no available service for :" + packageName);
                            return ;
                        }

                        let destServicePath = getRandomService(serviceList);
                        let proxy = new Proxy(destServicePath, '', '');
                        proxy.invoke(methodName, args, function (proxyInvokeErr, reply) {
                            if(proxyInvokeErr){
                                logger.error("while invoke " + methodName + " service error :%s",proxyInvokeErr);
                                logger.error(proxyInvokeErr);
                                reject(proxyInvokeErr);
                            }else{
                                if(reply&&reply.fault && reply.fault === true){

                                    logger.error("invoke " + methodName + " service response has error:%s",reply);
                                    logger.error(reply);
                                    reject(reply);
                                }
                                resolve(reply);
                            }
                        });

                    });

                } else {
                    logger.error('Node %s does not exist.',serviceProvidersPath);
                    reject('Node ' + serviceProvidersPath +' does not exist.');
                }
            });

        });
    }

};

module.exports = new DubboClient();