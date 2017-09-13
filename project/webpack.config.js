'use strict';
const fs = require("fs");
const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const crypto = require('crypto');

let appConfig = JSON.parse(fs.readFileSync(path.join(__dirname, './runnable/appConfig.json'),"utf8"));
let envMode = appConfig.envMode || "dev";
let staticResourceVersion = appConfig.staticResourceVersion || "201607210000";

let entry = getEntry( path.resolve(__dirname,'public/js/app'));
let webpackConfig = {
  entry:entry,
  output: {
    path: path.resolve(__dirname,'public/dist'), //文件输出目录
    publicPath: "/dist/",
    filename: "js/[name].js"
  },
  resolve:{
    extensions: ['', '.js', '.css', '.scss', '.tpl', '.png', '.jpg'],
    root: path.join(__dirname,"/public/"), //绝对路径
    //别名
    alias:{
      jQuery: 'js/libs/jquery-1.12.4.min.js',
     //  mustache:"js/libs/mustache//0.7.2/mustache.js",
      dateRange: "js/libs/daterangepicker/daterangepicker.js",
      moment:"js/libs/moment.js",
      utils:"js/common/utils.js",
      decimal: 'js/libs/decimal.min.js'

    }
  },
  module:{
    loaders: [{
        test: /\.(png|jpg)$/,
        loader: "url-loader",
        query: {
            mimetype: "image/png" ,
            limit:8192,
            publicPath:'/fitrecord/dist/',
            name: "imgs/[name].[ext]"
        }

    },{
        test : /\.css$/,
        loader : ExtractTextPlugin.extract('style-loader', 'css-loader')
    },{
        test: /\.tpl$/,
        // loader: 'mustache'
        // loader: 'mustache?minify'
        // loader: 'mustache?{ minify: { removeComments: false } }'
        loader: 'mustache?noShortcut'
    }]
  },
  plugins: [
      new ExtractTextPlugin('css/[name].css')
  ]
};
!function(){
  if(envMode === "dev"){
    console.log("webpack : 这是开发模式，不进行压缩。");
    webpackConfig.devtool= "source-map";
  }else{
      webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
          mangle: false,
          compress: {
              warnings: false
          },
          output: {
              screw_ie8: false
          }

      }));
  }
}();

module.exports = webpackConfig;

;function md5(path){
    let versionId = "_" + staticResourceVersion;
    return crypto.createHash('md5').update(path+versionId).digest('hex');
}
;function getEntry(){
    let args = Array.prototype.slice.call(arguments)
        ,dir = args[0]
        ,_files = args[1]
        ,matchs=[]
        ,dirList = fs.readdirSync(dir)
        ;
    if(typeof(_files)=='undefined'){
      _files={};
      _files[md5("common")] = path.resolve(path.resolve(__dirname)+'/public/js/common/common');
    }
    dirList.forEach(function(item){
        let itemPath = path.resolve(dir,item);
        if(fs.statSync(itemPath).isDirectory()){
            getEntry(itemPath,_files);
        }else{
            matchs = item.match(/(.+)\.js$/);
            if(matchs){
                _files[md5(matchs[1])] = itemPath;
            }
        }
    });
    return _files;
}
