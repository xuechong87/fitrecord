'use strict';

var common = require('../common/common');
var logger = common.getLogger('dubbo.zkconfig');
let zookeeper = require('node-zookeeper-client');


module.exports = {

    initConnection: function (host, options) {

        options = options || {sessionTimeout: 30000};//30 sec

        logger.info( "zk options : " + JSON.stringify(options));

        let createZkClient = function(){

            logger.info( "create zk client with options : " + JSON.stringify(options));

            global.zkclient = zookeeper.createClient(
                host,
                options//30 sec
            );

            global.zkclient.once('connected', function () {
                logger.info('Connected to the server. %s', global.zkclient.state);
            });

            global.zkclient.once('disconnected', function () {
                logger.error('zk connect Disconnected , zkclient state is %s', global.zkclient.state);
                createZkClient();
                //throw new Exception('zk connect Disconnected ,zkclient state is ' + global.zkclient.state);
            });

            global.zkclient.once('expired', function () {
                logger.error('zk connect Expired , zkclient state is %s', global.zkclient.state);
                createZkClient();
                //throw new Exception('zk connect Expired,zkclient state is '+ global.zkclient.state);
            });
            global.zkclient.connect();
        };

        createZkClient();

    }


};