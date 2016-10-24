/**
 * Created by wqq on 16/8/2.
 */
绑定事件
function myAddEvent(obj,sEv,fn) {
    if(obj.attachEvent){
        obj.attachEvent("on"+sEv,function () {
            fn.call(obj);
        });
    }
    else 
    {
        obj.addEventListener(sEv,fn,false);
    }
}


function getByClass(oParent,sClass) {
    var aEle=oParent.getElementsByTagName("*");
    var aResult=[];
    var i=0;
    for (i=0;i<aEle.length;i++){
        if(aEle[i].className==sClass){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}
function VQuery(vArg) {
    this.elements=[];
    switch (typeof vArg){
        case "function":
            myAddEvent(window,"load",vArg)
            break;
        case "string":
            switch (vArg.charAt(0)){
                case "#":
                    var obj= document.getElementById(vArg.substring(1));
                    this.elements.push(obj);
                    break;
                case ".":
                    // this.elements=getByClass("body",vArg.substring(1));
                    this.elements=getByClass(document,vArg.substring(1));
                    break;
                default:
                    this.elements=document.getElementsByTagName(vArg);
            }
            break;
        case "object":
            this.elements.push(vArg);
           
    }
}
// 添加点击事件
VQuery.prototype.click=function (fn) {
    var i =0;
    for(i=0;i<this.elements.length;i++){
        myAddEvent(this.elements[i],"click",fn)
    }
};
// show
VQuery.prototype.show=function () {
    var i =0;
    for(i=0;i<this.elements.length;i++){
        this.elements[i].style.display="block";
    }
}
// hide
VQuery.prototype.hide=function () {
    var i =0;
    for(i=0;i<this.elements.length;i++){
        this.elements[i].style.display="none";
    }
}
// hover
VQuery.prototype.hover=function (fnOVer,fnOut) {
    var i=0;
    for(i=0;this.elements;i++){
        myAddEvent(this.elements[i],"mouseover",fnOVer);
        myAddEvent(this.elements[i],"mouseout",fnOut);
        
    }
}
VQuery.prototype.css=function (attr,value) {
    if(arguments.length==2){
        var i=0;
        for(i=0;i<this.elements.length;i++){
            this.elements[i].style[attr]=value;
        }
    }else {
       return getStyle(this.elements[0],attr)
    }
}
function getStyle(obj,attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else {
        return getComputedStyle(obj,false)[attr];
    }
}
// 绑定符号
function $(vArg) {
    return new VQuery(vArg);
}