var Test_Mode=true;
var MouseX;
var MouseY;
var WindowResize;
$(function(){
    if(Test_Mode){testlogid.style.display="block";}
    mainid.ondragstart = function() {return false;};
    document.documentElement.style.setProperty("--animadur","0.25s");
    document.onmousemove=function(event){
        event = event || window.event;
        MouseX = event.clientX;
        MouseY = event.clientY;
        if(Test_Mode){
            let elementstr;
            if(GetMouseElement()!==undefined){
                elementstr=GetMouseElement().className+"\nid:"+GetMouseElement().id;
            }else{
                elementstr="null";
            }
            testlogid1.innerText=elementstr;
            testlogid2.innerText="X:"+MouseX+" Y:"+MouseY;
        }
    }
});

function testlog(value){
    testlogid3.innerText=value.toString()+"\n"+testlogid3.innerText;
}
function ShowElement(element){
    element.style.display="block";
    element.style.opacity="0";
    $(element).stop().animate({opacity:"1"},GetHtmlAnimateTime());
}
function HiddenElement(element){
    $(element).stop().animate({opacity:"0"},GetHtmlAnimateTime(),function(){
        element.style.display="none";
    })
}

function GetHtmlAnimateTime(){
    let htmlStyle = window.getComputedStyle(document.documentElement);
    let value = htmlStyle.getPropertyValue('--animadur');
    value=value.replace(/s/gi, "");
    return parseFloat(value)*1000;
}

function getElementTopToBody(element) {
    return element.getBoundingClientRect().top+document.documentElement.scrollTop||document.body.scrollTop||window.scrollY
}
function getElementLeftToBody(element) {
    return element.getBoundingClientRect().left+document.documentElement.scrollLeft||document.body.scrollLeft||window.scrollX
}

function StringsHave(str, substring) {
    let regex = new RegExp(substring);
    return regex.test(str);
}

function MouseIn(obj) {
    if(obj===null){return false;}
    let rect = obj.getBoundingClientRect();
    return MouseX >= rect.left && MouseX <= rect.right && (MouseY +document.documentElement.scrollTop)  >= rect.top && MouseY <= rect.bottom;
}

function GetMouseElement(){
    return document.elementFromPoint(MouseX,MouseY);
}

const observeroptions = {
    root:null, // 视窗的根节点，默认为浏览器视窗
    threshold: 0.6 // 目标元素可见的比例阈值，默认为0
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.play();
        } else {
            entry.target.pause();
        }
    });
}, observeroptions);
function WindowResizeTransform(){
    let value= (Math.round(1000 * (outerWidth / innerWidth)) / 10);
    WindowResize=GetRealWindowResize(value);
    document.documentElement.style.width=WindowResize+"%";
}
function GetRealWindowResize(value){
    let realvalue=[25,50,33,67,75,80,90,100,110,125,150,175,200,250,300,400,500];
    for(let i=0;i<realvalue.length;i++){
        if(Math.abs(value-realvalue[i])<8){value=realvalue[i]}
    }
    return value;
}
$(function(){
    $(window).resize(function() {
        WindowResizeTransform();
    });
    WindowResizeTransform();
    if(WindowResize<90||WindowResize>120){
        window.alert("网页窗口大小不是默认设置 "+WindowResize+"%");
    }
})
window.dispatchEvent(new CustomEvent('resize'));
