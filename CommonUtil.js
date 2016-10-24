/**
 * Created by qingyun on 16/9/18.
 */
/**
 * WQQ  命名空间
 * */
var WQQ = {};
WQQ.Interface=function(name,methods){
//				判断接口的参数个数
    if(arguments.length!=2){
        throw new Error("this instance interface constructor arguments must be 2 length");
    }
    this.name=name;
    this.methods=[];//定义一个内置的空数组对象 等待接收 methods 里的元素
    for(var i=0;i<methods.length;i++){
        if(typeof methods[i]!=="string"){
            throw new Error("the Interface method name is error!");
        }
        this.methods.push(methods[i]);
    }
}


//Interface static method
WQQ.Interface.ensureImplements=function(object){
    if(arguments.length<2){
        throw new Error("Interface.ensureImplements method construct arguments must be >=2");
    }
    //获得接口实例对象
    for(var i=1;i<arguments.length;i++){
        var istanceInterface=arguments[i];
        //判断参数是否是接口类的类型
        if(istanceInterface.constructor!==WQQ.Interface){
            throw new Error("the arguments constructor must be Interface");
        }
//					//循环接口实例对象的每一个方法
        for(var j=0;j<istanceInterface.methods.length;j++){
//						//用一个零时变量  接收每一个方法的名字
            var methodName=istanceInterface.methods[j];
//						//object[key]
//             console.log(object[methodName]);
            if(!object[methodName]||typeof object[methodName]!=="function"){
                throw new Error("the method name'"+methodName+"' is not found");
            }
        }
    }
};
/**
 * extend method
 * */
WQQ.extend=function(sub,sup) {
    var F = new Function();
    F.prototype = sup.prototype;
    sub.prototype = new F();
    sub.prototype.constructor = sub;
    sub.superClass = sup.prototype;
    if(sup.prototype.constructor == Object.prototype.constructor){
        sup.prototype.constructor = sup;
    }
};
/**
 * 单体模式  跨浏览器的事件处理程序
 * */
WQQ.EventUtil={
    addHandler:function (element,type,handler) {
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }
    },
    removeHandler:function (ele,type,handler) {
        if(element.addEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.detachEvent('on'+type,handler);
        }
    }
};

