/**
 * Created with zhaojing0401@gmail.com
 * Date: 17-02-16
 * Time: 上午11:50
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
})('CountDown',function(){

    function CountDown(opt){
        if(!opt) opt={};
        this.dom = opt["dom"]?opt["dom"]:null;
        this.totalSecond=(opt["totalSecond"] && opt["totalSecond"]>0)?opt["totalSecond"]:0;//总时间 s
        this.auto=opt["auto"]?opt["auto"]:false;//默认:不自动倒计时
        this.fn=opt["fn"]?opt["fn"]:null;
        this.zeroFn=opt["zeroFn"]?opt["zeroFn"]:null;
        this.timer=null;
        this.flag=false;
        if(!this.dom||this.totalSecond<0) {
            //alert("请设置正确的参数");
            return false;
        }
        var self=this;
        var format=function(t){
            var d, h, m, s;
            d = Math.floor(t/86400);
            h = Math.floor(t/3600)%24;
            m = Math.floor(t/60)% 60;
            s = t%60;
            if(d<10){d="0"+d;}
            if(h<10){h="0"+h;}
            if(m<10){m="0"+m;}
            if(s<10){s="0"+s;}
            return "&nbsp;"+d+"&nbsp;天&nbsp;"+h+"&nbsp;时&nbsp;"+m+"&nbsp;分&nbsp;"+s+"&nbsp;秒";
        };
        self.dom.innerHTML=format(self.totalSecond);
        if(this.totalSecond==0) {
            //alert("倒计时直接结束");
            return 0;
        }
        this.fun=function(){
            if(self.flag) return;
            self.totalSecond--;
            self.dom.innerHTML=format(self.totalSecond);
            if(self.fn){
                self.fn();
            }
            if(self.totalSecond<=0){
                self.flag=true;
                clearInterval(self.timer);
                if(self.zeroFn){
                    self.zeroFn();
                }
            }
        };
        if(self.auto){
            this.timer=setInterval(self.fun,1000);
        }
    }
    CountDown.prototype.stop=function(){
        var self = this;
        self.flag=true;
        clearInterval(self.timer);
    };
    CountDown.prototype.start=function(){
        var self = this;
        if(self.totalSecond<=0){
            return false;
        }
        if(self.flag){
            self.flag=false;
            this.timer=setInterval(self.fun,1000);
        }

    };
    return CountDown;
});
