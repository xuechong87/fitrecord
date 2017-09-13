jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { 
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); 
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { 
		//该 对象由后面的值由null改为{}
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				/*
				 * 加入以下代码
				 * 实现遍历所有的cookie值。同时以对象的方式返回。
				 * 改良以前在没有传入参数的时候返回为null的缺点。
				 */
				if (typeof name != 'undefined') {
					//以下代码是原码
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}else {
					var keyValue = cookie.split("=");
					cookieValue[keyValue[0]] = decodeURIComponent(keyValue[1]);
				}
			}
		}
        return cookieValue;
    }
};
