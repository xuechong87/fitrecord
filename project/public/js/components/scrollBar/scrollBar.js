//scrollBar.js creat by zhaojing0401@gmail.com at 20170222
/**
 *  depends on jquery or zepto
 *  opt = {
 *            $ele      : $("#J_scrollBar"),//滚动条$dom对象
 *            $con : $("#J_scrollBarCon") //内容高度
 *  }
 */
!(function(name,factory){
    var hasDefine  = typeof define === 'function',
        hasExports = typeof module !== 'undefined' && module.exports;
    if(hasDefine){
        define(factory);
    }else if(hasExports){
        module.exports = factory();
    }else{
        this[name] = factory();
    }
})('ScrollBar',function(){
    function ScrollBar(opt){
        return (this instanceof ScrollBar) ? this.init(opt) : new ScrollBar(opt);
    }
    ScrollBar.prototype={
        constructor:ScrollBar,
        init:function(opt){
            var _this = this
                ,$ele = opt.$ele
                ,$con = opt.$con
                ;
            if(!$ele || !$ele.get(0) || !$con || !$con.get(0)) return ;

            var conHeight = $con.outerHeight();
            var height = $ele.innerHeight();
            if(height>=conHeight) return;

            _this.$ele = $ele;
            _this.$con = $con;
            _this.conHeight = conHeight;
            _this.height = height;
            _this.render();
        },
        render:function(){
            var _this = this;
            _this.$ele.addClass("iv-scroll")
            var $scrollBar = $(["<div class='iv-scroll-bar'>",
                "<div class='iv-scroll-bluek'></div>",
                "</div>"].join(""));
            _this.$ele.prepend($scrollBar);
            _this.$scrollBar = $scrollBar;
            _this.$scrollBluek = $scrollBar.find(".iv-scroll-bluek");
            _this._scroll();
            _this._wheel();
        },
        _scroll:function(){
            var _this = this;
            var h = _this.height,sumH=_this.conHeight;
            var per = h/sumH;
            var sh = h*per;
            var $scrollBluek=_this.$scrollBluek;
            var $scrollBar = _this.$scrollBar ;
            var $con = _this.$con;
            $scrollBluek.height(sh);

            var dragging=false,startY= 0,startTop= 0,maxTop=h-sh;
            _this.$scrollBluek.mousedown(function(e){

                dragging = true;
                $con.addClass("iv-no-select");
                startTop= $(this).offset().top- $scrollBar.offset().top;
                startY = e.pageY;
                $(document).mouseup(function(){
                    if(!dragging) return;
                    dragging = false;
                    $con.removeClass("iv-no-select");
                });
                $(document).mousemove(function(e){
                    if(!dragging) return;
                    var t = startTop+(e.pageY-startY);
                    if(t<0){t=0}
                    if(t>maxTop){
                        t=maxTop;
                    }
                    _this.$scrollBluek.css('marginTop',t);
                    $con.css('marginTop',-t/per);
                })
            });
        },
        _wheel:function(){
            var _this = this;
            var smt=0;
            var $scrollBluek=_this.$scrollBluek;
            var $scrollBar = _this.$scrollBar ;
            var $con = _this.$con;
            var isFF=navigator.userAgent.indexOf("Firefox")>0 ? true :false;
            var h = _this.height,sumH=_this.conHeight;
            var fn=function(e){
                var eve = e||window.event;
                var st = -eve.wheelDelta||eve.detail*40;//向下-120
                smt=smt+st;
                if(smt<0){smt=0;}
                if(smt>(sumH-h)){
                    smt=sumH-h;
                }
                $scrollBluek.css('marginTop',smt*h/sumH);
                $con.css('marginTop',-smt);
                if(e && e.stopPropagation){
                    e.stopPropagation();
                    e.preventDefault();
                }else{
                    window.event.cancelBubble=true;
                    return false;
                }
            }
            var dom = _this.$ele.get(0);
            if(dom.addEventListener){
                dom.addEventListener(isFF?'DOMMouseScroll':'mousewheel',fn,false);
            }else{
                dom.attachEvent('onmousewheel',fn);
            }
        }

    };
    return ScrollBar;
});