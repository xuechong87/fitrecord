'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log4js = require('log4js');
var log = log4js.getLogger('main-app');

var common = require('./common/common');
var app = express();

//webpack config start
if(common.isDevMode()){
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackDevConfig=require('./webpack.config.js');
  var compiler = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(compiler,{
      noInfo: false,
      publicPath: webpackDevConfig.output.publicPath,
      stats: {
          colors: true
      }
  }));
}
//webpack middleware end


app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Module dependencies.
 */
log.info("swig conf path:" + path.join(__dirname, 'runnable/swigconf.json'));
var fs = require('fs');
var swigConf = fs.readFileSync(path.join(__dirname, 'runnable/swigconf.json'),"utf8");
log.info("swig conf:\r\n" + swigConf);
var swig = require('swig');
var swigEngine = new swig.Swig(JSON.parse(swigConf));

var swigFilters = require("./common/swigFilters");
for (var i=0;i < swigFilters.length;i++){
  swigEngine.setFilter(swigFilters[i].name,swigFilters[i].func);
}
app.engine('swig', swigEngine.renderFile);
app.set('view engine', 'swig');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/imgs/global', 'favicon.ico')));
if(common.isDevMode()||common.isTestMode()){
  app.use(logger('dev'));//开发模式记录请求日志
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

///route${routes}
require('./RouteMap')(app);
//${routes}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (common.isDevMode()||common.isTestMode()) {
  app.use(function (err, req, res, next) {
    log.error(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}else{
  // production error handler
  app.use(function (err, req, res, next) {
    log.error(err);
    res.render('404',{req:req});
  });
}
log.info("err handlers init fin");

var rootRout = express();
let ctxPath = common.getContextPath();
rootRout.use('/'+ctxPath,app);
let jumpRouter = require('./routes/jumpRouter');
rootRout.use('/',jumpRouter);

log.info("server ctx path is : /" + ctxPath);

module.exports = rootRout;
