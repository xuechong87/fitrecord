'use strict';


var constans = function() {

    this.getConstant = function(key){
        return global.appConstants[key];
    };

};

module.exports = new constans();