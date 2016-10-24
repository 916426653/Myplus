/**
 * Created by qingyun on 16/8/2.
 */
// 绑定事件
function myAddEvent(obj,sEv,fn) {
    if(obj.attachEvent){
        obj.attachEvent("on"+sEv,fn);
    }else {
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
    }
}
VQuery.prototype.click=function (fn) {
    var i =0;
    for(i=0;i<this.elements.length;i++){
        myAddEvent(this.elements[i],"click",fn)
    }
};