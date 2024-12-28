var Test_Mode=true;
var MouseX;
var MouseY;
$(function(){if(Test_Mode){testlogid.style.border="2px solid #93bd6f"}});

function testlog(value){
    testlogid3.innerText=(value+"").concat(testlogid3.innerText);
}

//鼠标坐标
window.onmousemove=function(ev){
    let oEvent = ev || event;
    MouseX = oEvent.clientX;
    MouseY = oEvent.clientY;
    if(Test_Mode){
        let elementstr;
        if(GetMouseElement()!=undefined){
            elementstr=GetMouseElement().className+"\nid:"+GetMouseElement().id;
        }else{
            elementstr="null";
        }
        testlogid1.innerText=elementstr;
        testlogid2.innerText="x:"+MouseX+" y:"+MouseY;
    }
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
    let rect = obj.getBoundingClientRect();
    let boolean=(MouseX >= rect.left && MouseX <= rect.right && (MouseY +document.documentElement.scrollTop)  >= rect.top && MouseY <= rect.bottom);
    return boolean;
}

function GetMouseElement(){
    return document.elementFromPoint(MouseX,MouseY);
}

function GetMouseElements(){
    return document.elementsFromPoint(MouseX,MouseY);
}


const options = {
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
}, options);

window.addEventListener('resize', function () {
    let resize= Math.round(1000 * (outerWidth / innerWidth)) / 10;
    testlog(resize+"%");
});
window.dispatchEvent(new CustomEvent('resize'));