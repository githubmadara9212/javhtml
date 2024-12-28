var vpluswindow;
var vpanlpluswidth="60%";
var vpanlplussleft="20%";
var vpanlplusstop="18%";
function RegisteredVplusEvent(panelwindow){
    $(panelwindow).onmousedown=PanelWindowPlusMove(event);
    $(panelwindow).onmousewheel=PanelWindowPlusWheel(event);
    panelwindow.style.width =vpanlpluswidth;
    panelwindow.style.left = vpanlplussleft;
    panelwindow.style.top = vpanlplusstop;
}
function CancellationVplusEvent(panelwindow){
    $(panelwindow).onmousedown=null;
    $(panelwindow).onmousewheel=null;
}
$(function() {
    $("#javframeid").click(function (event) {
        let element = event.target;
        if (element.className === "panelvideo") {
            let panelwindow = element.parentNode;
            let panelbox = panelwindow.parentNode;
            let panelbackbox = panelbox.children[1];
            if (StringsHave(panelwindow.className, "panelwindowplus") == false) {
                if (vpluswindow != null) {
                    RestorePanelWindow(vpluswindow);
                }
                panelwindow.style.transitionDuration = "0s";
                panelwindow.style.pointerEvents = "none";
                SetPanelWindowPostion(panelwindow);
                panelwindow.style.width = GetPanelWindowPosition(panelwindow, "width");
                panelwindow.style.left = GetPanelWindowPosition(panelwindow, "left");
                panelwindow.style.top = GetPanelWindowPosition(panelwindow, "top");
                $(panelwindow).addClass("panelwindowplus");
                $(panelwindow).stop().animate({width:vpanlpluswidth, left:vpanlplussleft, top:vpanlplusstop}, 250, function () {
                    panelwindow.style.transitionDuration = "var(--animadur)";
                    panelwindow.style.pointerEvents = "auto";
                    RegisteredVplusEvent(panelwindow);
                });
                panelbackbox.style.display = "block";
                vpluswindow = panelwindow;
            }
        }
    })
})

function SetPanelWindowPostion(panelwindow){
    let w=(panelwindow.offsetWidth/document.body.offsetWidth)*100+"%";
    let l=(getElementLeftToBody(panelwindow)/document.body.offsetWidth)*100+"%";
    let t=(getElementTopToBody(panelwindow)/document.body.offsetHeight)*100+"%";
    panelwindow.setAttribute("inboxwidth",w);
    panelwindow.setAttribute("inboxleft",l);
    panelwindow.setAttribute("inboxtop",t);
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
        RestorePanelWindow(vpluswindow);
        vpluswindow=null;
    }
});

function RestorePanelWindow(panelwindow){
    let panelbox=panelwindow.parentNode;
    let panelbackbox=panelbox.children[1];
    panelwindow.style.transitionDuration="0s";
    let w=GetPanelWindowPosition(panelwindow,"width");
    let l=GetPanelWindowPosition(panelwindow,"left");
    let t=GetPanelWindowPosition(panelwindow,"top");
    CancellationVplusEvent(panelwindow);
    $(panelwindow).stop().animate({width:w,left:l,top:t},250,function(){
        $(panelwindow).removeClass("panelwindowplus");
        panelwindow.style.width="100%";
        panelwindow.style.left="0%";
        panelwindow.style.top="0%";
        panelbackbox.style.display = "none";
        setTimeout(function(){
            panelwindow.style.transitionDuration="var(--animadur)";
            panelwindow.style.pointerEvents="auto";
            let elementstr=GetMouseElement().className;
            if(StringsHave(elementstr,"panel")==false){
                CleanPanelBoxBlur();
            }else{
                SiblingsPanelBoxBlur(GetElementPanelBox(GetMouseElement()));
            }
        },0);
    });
}

function GetElementPanelBox(element){
    let elementstr=element.className;
    if(StringsHave("panelwindow,panelbackbox",elementstr)){
        return element.parentNode;
    }
    if(StringsHave("paneltittle_box,panelvideo,paneladdtittle_box,panelpadd",elementstr)){
        return element.parentNode.parentNode;
    }
    if(StringsHave("paneltittle_str,paneladdtittle_str",elementstr)){
        return element.parentNode.parentNode.parentNode;
    }
}

function GetPanelWindowPosition(panelwindow,method){
    if(method=="width"){
        return panelwindow.getAttribute("inboxwidth");
    }
    if(method=="left"){
        return panelwindow.getAttribute("inboxleft");
    }
    if(method=="top"){
        return panelwindow.getAttribute("inboxtop");
    }
}
function PanelWindowPlusMove(event) {
    vpluswindow.onmousedown=function(e){
        if(MouseIn(vpluswindow)){
            let disX =MouseX - vpluswindow.offsetLeft;
            let disY = MouseY - vpluswindow.offsetTop;
            vpluswindow.style.transitionDuration = "0s";
            document.onmousemove = function (e) {
                let l =MouseX- disX;          //获取div左边的距离
                let t =MouseY- disY;          //获取div上边的距离
                let left=(l/document.documentElement.clientWidth)*100+"%";
                let top=(t/document.documentElement.clientHeight)*100+"%";
                vpluswindow.style.left =left;
                vpluswindow.style.top =top;
                CheackPanelWindowPlusPosition();
            };
            /*鼠标的抬起事件,终止拖动*/
            document.onmouseup = function () {
                vpluswindow.style.transitionDuration ="var(--animadur)";
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
}
var vpluswindowwheeltimer;
var wheelbr=true;
function PanelWindowPlusWheel(e) {
    vpluswindow.onmousewheel = function (e) {
        if(wheelbr&&MouseIn(vpluswindow)){
            var e = e || window.event;
            let width = parseFloat(vpanlpluswidth.replace(/%/gi, ""));
            let left = parseFloat(vpanlplussleft.replace(/%/gi, ""));
            let top = parseFloat(vpanlplusstop.replace(/%/gi, ""));
            let value = 0;
            if (e.wheelDelta >= 120) {
                value = 20;
            } else {
                value =-20;
            }
            if ((width + value) < 20 || (width + value) > 90) {
                value = 0;
            } else {
                width = width + value;
                left = left - (value /(16/9));
                top = top - (value /(16/9));
                vpanlpluswidth = width.toString() + "%";
                vpanlplussleft = left.toString() + "%";
                vpanlplusstop = top.toString() + "%";
                vpluswindow.style.width = vpanlpluswidth;
                vpluswindow.style.left = vpanlplussleft;
                vpluswindow.style.top = vpanlplusstop;
                CheackPanelWindowPlusPosition();
            }
        }
        wheelbr=false;
        clearTimeout(vpluswindowwheeltimer); //不会一次滚动触发多次事
        timer = setTimeout(function (e) {
            wheelbr=true;
        }, 100);
    }
}
function CheackPanelWindowPlusPosition(){
    let disX =MouseX - vpluswindow.offsetLeft;
    let disY = MouseY - vpluswindow.offsetTop;
    let l =MouseX- disX;          //获取div左边的距离
    let t =MouseY- disY;          //获取div上边的距离
    if (l < 0) {        //判断div的可视区，为避免DIV失去鼠标点
        l = 0;
    }
    else if (l > document.documentElement.clientWidth - vpluswindow.offsetWidth) {
        l = document.documentElement.clientWidth - vpluswindow.offsetWidth;
    }
    if (t < 0) {
        t = 0;
    }
    else if (t > document.documentElement.clientHeight - vpluswindow.offsetHeight) {
        t = document.documentElement.clientHeight - vpluswindow.offsetHeight;
    }

    let left=(l/document.documentElement.clientWidth)*100+"%";
    let top=(t/document.documentElement.clientHeight)*100+"%";
    vpluswindow.style.left =left;
    vpluswindow.style.top =top;
    vpanlplussleft=left;
    vpanlplusstop=top;

}
/* 监听动画 transition-duration 完成后执行
panelpadd.addEventListener('transitionend', onTransitionEnd, false);
function onTransitionEnd() {
    this.style.display="none";
    this.removeEventListener('transitionend', onTransitionEnd);
}

let src=elebox.getAttribute("URL");
let time=element.currentTime;
let poturl="potplayer://"+src+" /seek="+time;
open(poturl);
 */