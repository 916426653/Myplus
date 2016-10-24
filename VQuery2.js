/**
 * Created by qingyun on 16/8/2.
 */
function myAddEvent(obj,sEv,fn) {
    if(obj.attachEvent)
    {
        obj.attachEvent("on"+sEv,fn);
    }
    else
    {
        obj.addEventListener(sEv,fn,false);
    }
}
// 通过class选元素
function getByClass(sClass) {
    var aEle=document.getElementsByTagName("*");
    var result=[];
    for (var i=0;i<aEle.length;i++)
    {
       if (aEle[i].className==sClass)
       {
           result.push(aEle[i]);
       }
    }
    return result;
}
function VQuery(
    vArg) {
    // 用来保存选中的元素
    this.elements=[];
    switch(typeof vArg){
        case "function":
            // window.onload=vArg;
            myAddEvent(window,"load",vArg)
            break;
        case "string":
            switch (vArg.charAt(0))
            {
                case "#":
                    var obj=document.getElementById(vArg.substring(1));
                    this.elements.push(obj);
                    break;
                case '.':
                    this.elements=getByClass(vArg.substring(1));
                    break;
                default:
                    this.elements=document.getElementsByTagName(vArg);
            }
            break;
    }
}
VQuery.prototype.click=function (fn) {
    var i=0;
    for(i=0;i<this.elements.length;i++)
    {
        myAddEvent(this.elements[i],"click",fn);
    }
};

