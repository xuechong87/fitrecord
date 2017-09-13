require('../../css/common.css');
window.$ = window.jQuery = require('jQuery');

var Util = window.Util={

    //格式化金额。s：金额数字; n: 小数点后几位，默认为0
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
    /**
     * Examples:
     * formatDate(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2013-08-06 08:09:04.423
     * formatDate(new Date(), "yyyy-M-d h:m:s.S")      ==> 2013-8-6 8:9:4.18
     * formatDate(new Date(), "yyyy年M月d日")           ==> 2013年8月6日
     */
    formatDate : function(date, fmt) {
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
    },
    /**
     * base64encode
     * @param s
     * @returns {*}
     */
    encodebase64Urlsafe : function(s){
        if(!s){
            return;
        }

        s += '';
        if(s.length === 0){
            return s;
        }
        s = escape(s);

        var i, b, x = [], map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=', padchar = map[64];
        var len = s.length - s.length % 3;

        for(i = 0; i < len; i += 3){
            b = (s.charCodeAt(i) << 16) | (s.charCodeAt(i+1) << 8) | s.charCodeAt(i+2);
            x.push(map.charAt(b >> 18));
            x.push(map.charAt((b >> 12) & 0x3f));
            x.push(map.charAt((b >> 6) & 0x3f));
            x.push(map.charAt(b & 0x3f));
        }

        switch(s.length - len){
            case 1:
                b = s.charCodeAt(i) << 16;
                x.push(map.charAt(b >> 18) + map.charAt((b >> 12) & 0x3f) + padchar + padchar);
                break;
            case 2:
                b = (s.charCodeAt(i) << 16) | (s.charCodeAt(i + 1) << 8);
                x.push(map.charAt(b >> 18) + map.charAt((b >> 12) & 0x3f) + map.charAt((b >> 6) & 0x3f) + padchar);
                break;
        }
        return x.join('').replace(/=+$/, '');
    }
};
!function(){

}();
