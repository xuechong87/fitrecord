/**
 * Created with jing.zhao2013
 * Date: 14-2-26
 * Time: 下午4:11
 */
(function($){$.fn.extend({
    "sliding":function(options){
        var ops = $.extend({
            width:100,//加上边框、补白的总宽度
            num:0,
            speed:1,
            circle:false,
            pre:null,
            next:null
        },options);
        var $dom=this;
        var $ul=$dom.find("ul"),sw=ops.width*ops.num,w=$dom.innerWidth();
        var opr = {
            setWidth:function(){
                $ul.width(sw);
            },
            pre:function(){
                if(ops.circle){
                    $ul.find("li").last().prependTo($ul);
                }else{
                    var l = $dom.scrollLeft();
                    $dom.animate({scrollLeft: l-ops.width}, ops.speed*100,function(){
                        ops.next.removeClass("on");
                        ops.pre.removeClass("on");
                        if($dom.scrollLeft()<=0){
                            ops.pre.addClass("on");
                        }
                    });
                }
            },
            next:function(){
                if(ops.circle){
                    $ul.find("li").first().appendTo($ul);
                }else{
                    var l = $dom.scrollLeft();
                    $dom.animate({scrollLeft: l+ops.width}, ops.speed*100,function(){
                        ops.next.removeClass("on");
                        ops.pre.removeClass("on");
                        if($dom.scrollLeft()+w>=sw){
                            ops.next.addClass("on");
                        }
                    });
                }
            },
            init:function(){
                if(sw<=w) {
                    ops.pre.addClass("on");
                    ops.next.addClass("on");
                    return false;
                }
                var self = this;
                if($dom.scrollLeft()<=0){
                    ops.pre.addClass("on");
                }else if($dom.scrollLeft()+w>=sw){
                    ops.next.addClass("on");
                }else{
                    ops.next.removeClass("on");
                    ops.pre.removeClass("on");
                }
                self.setWidth();
                ops.pre.bind("click",self.pre);
                ops.next.bind("click",self.next);
            }
        };
        opr.init();
    }
})})(jQuery);