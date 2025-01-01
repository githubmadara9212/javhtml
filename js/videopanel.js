var Panel_Line=4;
var Panel_Down=4;
var Panel_width;
$(function() {
    $("#htmllogoid").mouseup(function(){

    })

    $("#mainsearchbtnid").mouseup(function () {
        DataBuild();
    })
})



//提交搜索
//  Old_Alpha_Data
//  Now_Alpha_Data
//  Old_Alpha_Data_Length
//  Now_Alpha_Data_Length
function InputOptimize(){
    let v_padding=1;
    let v_width=(100-v_padding*(Panel_Line+1))/Panel_Down;
    for(let i=0;i<Old_Alpha_Data_Length;i++){

    }
}

function DataBuild(){
    Now_Alpha_Data=[];
    for(let i=0;i<Old_Alpha_Data_Length;i++){
        Now_Alpha_Data.push(Old_Alpha_Data[i]);
        Now_Alpha_Data_Length=Now_Alpha_Data.length;
    }
    PanelBuild();
}

function PanelBuild(){
    Panel_width=(100-(Panel_Line+1))/Panel_Line;
    $("#javtopnomalid").stop().animate({marginTop:"2%"},200,function(){
        for(let i=0;i<Now_Alpha_Data_Length;i++){
            let panelbox=document.createElement("div");
            panelbox.className="panelbox";
            panelbox.style.width=Panel_width+"%";
            panelbox.id="panelbox"+i;
            javframeid.appendChild(panelbox);
            ExtrudeBoxAnimation(panelbox);

            let panelbackbox=document.createElement("div");
            panelbackbox.className="panelbackbox";
            panelbackbox.id="panelbackbox"+i;
            panelbackbox.style.display="none";
            panelbox.appendChild(panelbackbox);
                let paneladdtittle_box=document.createElement("div");
                paneladdtittle_box.className="paneladdtittle_box";
                paneladdtittle_box.id="paneladdtittle_box"+i;
                panelbackbox.appendChild(paneladdtittle_box);
                    let paneladdtittle_str=document.createElement("b");
                    paneladdtittle_str.className="paneladdtittle_str";
                    paneladdtittle_str.innerText="\n";
                    paneladdtittle_box.appendChild(paneladdtittle_str);
                let panelpadd=document.createElement("img");
                panelpadd.src="./images/panelpadding.gif";
                panelpadd.className="panelpadd";
                panelbackbox.appendChild(panelpadd);

            let panelwindow=document.createElement("div");// 变动的真实盒子 PLUS
            let url=Quality+Now_Alpha_Data[i].MCode+Now_Alpha_Data[i].MFormat;
            panelwindow.className="panelwindow";
            panelwindow.id="panelwindow"+i;
            panelwindow.setAttribute("URL",url);
            panelbox.appendChild(panelwindow);

                let paneltittle_box=document.createElement("div");
                paneltittle_box.className="paneltittle_box";
                paneltittle_box.id="paneltittle_box"+i;
                panelwindow.appendChild(paneltittle_box);
                    let paneltittle_str=document.createElement("b");
                    paneltittle_str.className="paneltittle_str";
                    paneltittle_str.innerText=Now_Alpha_Data[i].MTitle;
                    paneltittle_box.appendChild(paneltittle_str);

                let panelvideo=document.createElement("video");
                panelvideo.src=url;
                panelvideo.className="panelvideo";
                panelvideo.id="panelvideo"+i;
                panelvideo.volume=0.6;
                panelvideo.muted=true;
                panelvideo.poster="./images/poster.gif"
                panelvideo.autoplay=true;
                panelvideo.loop=true;
                panelvideo.controls=false;
                panelvideo.disablePictureInPicture=true;
                panelwindow.appendChild(panelvideo);
                observer.observe(panelvideo);

                let PanelControlSmall=document.createElement("div");
                PanelControlSmall.className="PanelControlSmall";
                panelwindow.appendChild(PanelControlSmall);
                    let PanelControllove=document.createElement("div");
                    PanelControllove.className="PanelControllove";
                    PanelControlSmall.appendChild(PanelControllove);
                    let PanelControlRemind=document.createElement("div");
                    PanelControlRemind.className="PanelControlRemind";
                    PanelControlSmall.appendChild(PanelControlRemind);
                    let PanelControllock=document.createElement("div");
                    PanelControllock.className="PanelControllock";
                    PanelControlSmall.appendChild(PanelControllock);
                    let PanelControlposture=document.createElement("div");
                    PanelControlposture.className="PanelControlposture";
                    PanelControlSmall.appendChild(PanelControlposture);
                    let PanelControlSpeed=document.createElement("div");
                    PanelControlSpeed.className="PanelControlSpeed";
                    PanelControlSmall.appendChild(PanelControlSpeed);
                    let PanelControlquality=document.createElement("div");
                    PanelControlquality.className="PanelControlquality";
                    PanelControlSmall.appendChild(PanelControlquality);

                let PanelControlBox=document.createElement("div");
                PanelControlBox.className="PanelControlBox";
                panelwindow.appendChild(PanelControlBox);
                    let PanelControlexit=document.createElement("img");
                    PanelControlexit.className="PanelControlexit";
                    PanelControlBox.appendChild(PanelControlexit);
                    let PanelControlvplay=document.createElement("div");
                    PanelControlvplay.className="PanelControlvplay";
                    PanelControlBox.appendChild(PanelControlvplay);
                    let PanelControlvtime=document.createElement("div");
                    PanelControlvtime.className="PanelControlvtime";
                    PanelControlBox.appendChild(PanelControlvtime);
                    let PanelControloption=document.createElement("div");
                    PanelControloption.className="PanelControloption";
                    PanelControlBox.appendChild(PanelControloption);
                    let PanelControlLoad=document.createElement("div");
                    PanelControlLoad.className="PanelControlLoad";
                    PanelControlBox.appendChild(PanelControlLoad);
                    let PanelControlview=document.createElement("div");
                    PanelControlview.className="PanelControlview";
                    PanelControlBox.appendChild(PanelControlview);
                    let PanelControlmaskt=document.createElement("div");
                    PanelControlmaskt.className="PanelControlmaskt";
                    PanelControlBox.appendChild(PanelControlmaskt);
                    let PanelControlmaskb=document.createElement("div");
                    PanelControlmaskb.className="PanelControlmaskb";
                    PanelControlBox.appendChild(PanelControlmaskb);
           }
        CreatePagination();

    })
}
function CreatePagination(){
    new Pagination({
        element: '#pages', // 渲染的容器  [必填]
        type: 1, // 样式类型，默认1 ，目前可选 [1,2] 可自行增加样式   [非必填]
        layout: 'total, home, prev, pager, next, last, jumper', // [必填]  sizes,
        pageIndex: 1, // 当前页码 [非必填]
        pageSize: 10, // 每页显示条数   TODO:默认选中sizes [非必填]
        pageCount: 9, // 页码显示数量，页码必须大于等于5的奇数，默认页码9  TODO:为了样式美观，参数只能为奇数， 否则会报错 [非必填]
        total: 200, // 数据总条数 [必填]
        singlePageHide: false, // 单页隐藏， 默认true  如果为true页码少于一页并且layout没有sizes则不会渲染 [非必填]
        pageSizes: [5, 20, 30, 40, 50], // 选择每页条数  TODO: layout的sizes属性存在才生效
        prevText: '上一页', // 上一页文字，不传默认为箭头图标  [非必填]
        nextText: '下一页', // 下一页文字，不传默认为箭头图标 [非必填]
        ellipsis: true, // 页码显示省略符 默认false  [非必填]
        disabled: true, // 显示禁用手势 默认false  [非必填]
        currentChange: function (index, pageSize) { // 页码改变时回调  TODO:第一个参数是当前页码，第二个参数是每页显示条数数量，需使用sizes第二参数才有值。
            console.log(index, pageSize);
        }
    })
}
function ExtrudeBoxAnimation(element) {
    element.onmouseenter = function () {
        SiblingsPanelBoxBlur(element);
    }
    element.onmouseleave = function () {
        if(vpluswindow==null){
            CleanPanelBoxBlur();
        }else{
            $(".panelbox").each(function(){
                if(StringsHave(this.children[1].className,"panelwindowplus")===false){
                    $(this).addClass("PanelBoxBlackBlur");
                }
            })
        }
    }
}
function SiblingsPanelBoxBlur(element){
    $(element).removeClass("PanelBoxBlackBlur");
    $(element).siblings().each(function(){
        if(StringsHave(this.children[1].className,"panelwindowplus")===false){
            $(this).addClass("PanelBoxBlackBlur");
        }
    })
    $("#javframeid").siblings().addClass("PanelBoxBlackBlur");
}
function CleanPanelBoxBlur(){
    $(".panelbox").each(function(){
        $(this).removeClass("PanelBoxBlackBlur");
    })
    $("#javframeid").siblings().removeClass("PanelBoxBlackBlur");
}
