/**
 * Created by wqq on 16/8/2.
 */
function myAddEvent(obj, sEv, fn) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + sEv, function () {
            fn.call(obj);
        });
    }
    else {
        obj.addEventListener(sEv, fn, false);
    }
}
function getByClass(oParent, sClass) {
    var aEle = oParent.getElementsByTagName("*");
    var aResult = [];
    var i = 0;
    for (i = 0; i < aEle.length; i++) {
        if (aEle[i].className == sClass) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj, false)[attr];
    }
}
function appendArr(arr1, arr2) {
    var i = 0;
    for (i = 0; i < arr2.length; i++) {
        arr1.push(arr2[i]);
    }
}
function getIndex(obj) {
    var aParents=obj.parentNode.children;
    var i=0;
    for(i=0;i<aParents.length;i++){
        if(obj==aParents[i]){
            return i;
        }
    }
}
function VQuery(vArg) {
    this.elements = [];
    switch (typeof vArg) {
        case "function":
            myAddEvent(window, "load", vArg)
            break;
        case "string":
            switch (vArg.charAt(0)) {
                case "#":
                    var obj = document.getElementById(vArg.substring(1));
                    this.elements.push(obj);
                    break;
                case ".":
                    this.elements = getByClass(document, vArg.substring(1));
                    break;
                default:
                    this.elements = document.getElementsByTagName(vArg);
            }
            break;
        case "object":
            this.elements.push(vArg);

    }
}

VQuery.prototype.click = function (fn) {
    var i = 0;
    for (i = 0; i < this.elements.length; i++) {
        myAddEvent(this.elements[i], "click", fn)
    }
};
VQuery.prototype.show = function () {
    var i = 0;
    for (i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = "block";
    }
}
VQuery.prototype.hide = function () {
    var i = 0;
    for (i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = "none";
    }
}

VQuery.prototype.hover = function (fnOver, fnOut) {
    var i = 0;
    for (i = 0; i < this.elements.length; i++) {
        myAddEvent(this.elements[i], "mouseover", fnOver);
        myAddEvent(this.elements[i], "mouseout", fnOut);
    }
}
VQuery.prototype.css = function (attr, value) {
    if (arguments.length == 2)	//设置样式
    {
        var i = 0;

        for (i = 0; i < this.elements.length; i++) {
            this.elements[i].style[attr] = value;
        }
    }
    else	//获取样式
    {

        return getStyle(this.elements[0], attr);
    }
};
VQuery.prototype.toggle = function () {
    var _arguments = arguments;
    var i = 0;
    for (i = 0; i < this.elements.length; i++) {
        addToggle(this.elements[i])

    }
    function addToggle(obj) {
        var count = 0;
        myAddEvent(obj, "click", function () {
            _arguments[count % _arguments.length].call(obj);
            count++;
        })
    }
}
VQuery.prototype.attr = function (attr, value) {
    if (arguments.length == 2) {
        var i = 0;

        for (i = 0; i < this.elements.length; i++) {
            this.elements[i][attr] = value;
        }
    }
    else {
        return this.elements[0][attr];
    }
};
VQuery.prototype.eq = function (n) {
    return $(this.elements[n]);
}
VQuery.prototype.find = function (str) {
    var i = 0;
    var aResult = [];
    for (i = 0; i < this.elements.length; i++) {
        switch (str.charAt(0)) {
            case ".":
                var aEle = getByClass(this.elements[i], str.substring(1));
                aResult = aResult.concat(aEle);
                break;
            default:
                var aEle = this.elements[i].getElementsByTagName(str);
                appendArr(aResult, aEle);
        }
    }
    // 不可以直接返回 aResult  返回的是一个数组
    var newVQuery = $();
    newVQuery.elements = aResult;
    return newVQuery;
}
VQuery.prototype.index=function () {
    return getIndex(this.elements[0]);
}
function $(vArg) {
    return new VQuery(vArg);
}