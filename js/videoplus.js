var vpluswindow;
var vplusvideo;
var vpanlpluswidth="60%";
var vpanlplussleft="20%";
var vpanlplusstop="18%";
function RegisteredVplusEvent(){
    PanelWindowPlusEvent();
    VplusVideoEvent();
}

function MouseInCondition(){
    let str=["paneltittle_str","PanelControl"];
    let cls=GetMouseElement().className;
    for(let i=0;i<str.length;i++){
        if(StringsHave(cls, str[i])){
            return false
        }
    }
    return true
}

$(function() {
    javframeid.onmouseup=function (event) {
        event = event || window.event;
        if (event.button === 2) {return}//不是右键点击
        let element = event.target;
        if (element.className === "panelvideo") {
            let panelwindow = element.parentNode;
            let paneltittlebox=panelwindow.children[0].children[0];
            let PanelControlsmall=panelwindow.children[2];
            let PanelControlbox=panelwindow.children[3];
            let panelbox = panelwindow.parentNode;
            let panelbackbox = panelbox.children[0];
            if (StringsHave(panelwindow.className, "panelwindowplus") === false) {
                if (vpluswindow!=null){RestorePanelWindow(vpluswindow);}
                vpluswindow = panelwindow;
                vplusvideo=vpluswindow.children[1];
                vplusvideo.play();
                panelwindow.children[3].children[1].src="\./images/pause.png";
                WritePanelWindowPostion(panelwindow);
                panelbackbox.style.display = "block";
                panelwindow.style.transitionDuration = "0s";
                panelwindow.style.pointerEvents = "none";
                PanelControlsmall.style.top="0%";
                $(PanelControlsmall).stop().animate({top:"0%"},GetHtmlAnimateTime());
                ShowElement(PanelControlbox);
                PanelControlbox.children[2].children[2].innerText=SecondToTime(panelwindow.children[1].duration);
                $(panelwindow).addClass("panelwindowplus");
                let width=GetPanelWindowPosition(panelwindow, "width");
                let left=GetPanelWindowPosition(panelwindow, "left");
                let top=GetPanelWindowPosition(panelwindow, "top");
                $(panelwindow).css({"width":width,"left":left,"top":top});
                $(panelwindow).stop().animate({width:vpanlpluswidth, left:vpanlplussleft, top:vpanlplusstop}, GetHtmlAnimateTime(), function () {
                      $(paneltittlebox).addClass("paneltittle_str_White");
                      panelwindow.style.transitionDuration = "var(--animadur)";
                      panelwindow.style.pointerEvents = "auto";
                      element.muted=false;
                      RegisteredVplusEvent();//注册事件
                });
            }
        }
        if (element.className === "PanelControlexit") {
            RestorePanelWindow(vpluswindow);
            vpluswindow=null;
        }
    }
})

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
        RestorePanelWindow(vpluswindow);
        vpluswindow=null;
    }
});

function RestorePanelWindow(panelwindow){
    let panelbox=panelwindow.parentNode;
    let paneltittlebox=panelwindow.children[0].children[0];
    let PanelControlsmall=panelwindow.children[2];
    let PanelControlbox=panelwindow.children[3];
    let panelbackbox=panelbox.children[0];
    panelwindow.style.transitionDuration="0s";
    let w=GetPanelWindowPosition(panelwindow,"width");
    let l=GetPanelWindowPosition(panelwindow,"left");
    let t=GetPanelWindowPosition(panelwindow,"top");
    panelwindow.style.pointerEvents = "none";
    $(PanelControlsmall).stop().animate({top:"2vh"},GetHtmlAnimateTime());
    CleanVpanelVplusEvent();
    HiddenElement(PanelControlbox);
    $(panelwindow).stop().animate({width:w,left:l,top:t},GetHtmlAnimateTime(),function(){
        $(panelwindow).removeClass("panelwindowplus");
        panelbackbox.style.display = "none";
        $(panelwindow).css({"width":"100%","left":"0%","top":"0%"});
        panelwindow.children[1].muted=true;
        panelwindow.children[1].play();
        setTimeout(function(){
            $(paneltittlebox).removeClass("paneltittle_str_White");
            panelwindow.style.transitionDuration="var(--animadur)";
            let elementstr=GetMouseElement().className;
            if(StringsHave(elementstr,"panel")===false){
                CleanPanelBoxBlur();
            }else{
                SiblingsPanelBoxBlur(GetElementPanelBox(GetMouseElement()));
            }
            panelwindow.style.pointerEvents = "auto";
        },0);
    });
}

function GetElementPanelBox(element){
    let elementstr=element.className;
    if(StringsHave("panelwindow,panelbackbox",elementstr)){
        return element.parentNode;
    }
    if(StringsHave("paneltittle_box,panelvideo,paneladdtittle_box,panelpadd,PanelControlexit",elementstr)){
        return element.parentNode.parentNode;
    }
    if(StringsHave("paneltittle_str,paneladdtittle_str",elementstr)){
        return element.parentNode.parentNode.parentNode;
    }
}
function PanelWindowPlusEvent() {
    vpluswindow.onmousedown=function(){
        if(MouseIn(vpluswindow)&&MouseInCondition()){
            let disX =MouseX - vpluswindow.offsetLeft;
            let disY = MouseY - vpluswindow.offsetTop;
            vpluswindow.style.transitionDuration = "0s";
            window.onmousemove = function () {
                let l =MouseX- disX;          //获取div左边的距离
                let t =MouseY- disY;          //获取div上边的距离
                let left=(l/document.documentElement.clientWidth)*100;
                let top=(t/document.documentElement.clientHeight)*100;
                vpanlplussleft = left.toString() + "%";
                vpanlplusstop = top.toString() + "%";
                $(vpluswindow).css({"left":vpanlplussleft,"top":vpanlplusstop});
            };
            /*鼠标的抬起事件,终止拖动*/
            window.onmouseup = function () {
                vpluswindow.style.transitionDuration ="var(--animadur)";
                window.onmousemove = null;
                window.onmouseup = null;
            };
        }
    }
    vpluswindow.onmousewheel = function (event) {
        if(MouseIn(vpluswindow)&&MouseInCondition()){
            event = event || window.event;
            let htmlStyle = window.getComputedStyle(document.documentElement);
            let value = htmlStyle.getPropertyValue('--vplusscale');
            let calculate=parseFloat(value);
            if (event.wheelDelta >0) {
                calculate=calculate+0.1;
            } else {
                calculate=calculate-0.1;
            }
            if(calculate<0.3){calculate=0.3}
            if(calculate>1.6){calculate=1.6}
            value=calculate.toString();
            document.documentElement.style.setProperty("--vplusscale",value);
        }
    }
}
function VplusVideoEvent(){
    vplusvideo.ontimeupdate=function(){
        let element=vpluswindow.children[3].children[2].children[0];
        element.innerText=SecondToTime(vplusvideo.currentTime);
    }
    vplusvideo.onplay=function(){
        let element=vpluswindow.children[3].children[1];
        element.src="\./images/pause.png"
    }
    vplusvideo.onpause=function(){
        let element=vpluswindow.children[3].children[1];
        element.src="\./images/play.png"
    }
    vpluswindow.children[3].children[1].onmouseup=function(){
        if(vplusvideo.paused){
            vplusvideo.play();
        }else{
            vplusvideo.pause();
        }
    }
}
function CleanVpanelVplusEvent(){
    vplusvideo.ontimeupdate=null;
    vplusvideo.onplay=null;
    vplusvideo.onpause=null;
    vpluswindow.children[3].children[1].onmouseup=null;
    vpluswindow.onmousedown=null;
    vpluswindow.onmousewheel =null;
}
function WritePanelWindowPostion(panelwindow){
    let w=(panelwindow.parentNode.offsetWidth/document.body.offsetWidth)*100+"%";
    let l=(getElementLeftToBody(panelwindow.parentNode)/document.body.offsetWidth)*100+"%";
    let t=(getElementTopToBody(panelwindow.parentNode)/document.body.offsetHeight)*100+"%";
    $(panelwindow).data("inboxwidth",w);
    $(panelwindow).data("inboxleft",l);
    $(panelwindow).data("inboxtop",t);
}
function GetPanelWindowPosition(panelwindow,method){
    if(method==="width"){
        return $(panelwindow).data("inboxwidth");
    }
    if(method==="left"){
        return $(panelwindow).data("inboxleft");
    }
    if(method==="top"){
        return $(panelwindow).data("inboxtop");
    }
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