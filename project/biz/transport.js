'use strict';

let common = require('../common/common');
let logger = common.getLogger('biz.transport');

let transport ={
    /*
     * 百分比转化
     */
    formatFloatNum:function(num){
        return  parseFloat(num/100).toFixed(2)+"%";
    },
    /*
     * 期限单位转化
     */
    formatDurationUnit:function(unit){
        return (unit=="MONTH")? "个月" : "天";
    },

    /*
     * Format amount from pure number to money format.
     * e.g. 1234567 -> 1,234,567
     */
    formatAmount : function(s, n) {
        n = n > 0 && n <= 20 ? n : 0;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse();
        var r = s.split(".")[1];
        var t = "", i;
        for (i = 0; i < l.length; i++) {
            t += l[i] + ( l[i+1] !== "-" && (i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
        }
        if (r) {
            return t.split("").reverse().join("") + "." + r; // 99.99
        } else {
            return t.split("").reverse().join("");
        }
    },

    /*
     * Examples:
     * formatDate(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2013-08-06 08:09:04.423
     * formatDate(new Date(), "yyyy-M-d h:m:s.S")      ==> 2013-8-6 8:9:4.18
     * formatDate(new Date(), "yyyy年M月d日")           ==> 2013年8月6日
     */
    formatDate : function(date, fmt) {
        //logger.info(date.getMonth());
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds() //秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
};
module.exports = transport;