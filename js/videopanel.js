var Panel_Line=3;
var Panel_Down=4;
var Panel_width=(100-((1*Panel_Line)+1))/Panel_Line;
$(function() {

    $("#htmllogoid").mouseup(function(){
        console.log("000");
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
    $("#javtopnomalid").stop().animate({marginTop:"2%"},200,function(){
        for(let i=0;i<Now_Alpha_Data_Length;i++){
            let panelbox=document.createElement("div");
            let srcvalue=Quality+Now_Alpha_Data[i].MCode+Now_Alpha_Data[i].MFormat;
            panelbox.className="panelbox";
            panelbox.id="panelbox"+i;
            panelbox.style.width=Panel_width+"%";
            panelbox.setAttribute("URL",srcvalue);
            javframeid.appendChild(panelbox);

            let paneltittle_box=document.createElement("div");
            paneltittle_box.className="paneltittle_box";
            panelbox.appendChild(paneltittle_box);
            let paneltittle_str=document.createElement("b");
            paneltittle_str.className="paneltittle_str";
            let strvalue=Now_Alpha_Data[i].MTitle;
            paneltittle_str.innerText=strvalue;
            paneltittle_box.appendChild(paneltittle_str);

            let panelvideo=document.createElement("video")
            panelvideo.src=srcvalue;
            panelvideo.className="panelvideo";
            panelvideo.muted="muted";
            panelvideo.autoplay="autoplay";
            panelvideo.disablePictureInPicture="true";
            panelbox.appendChild(panelvideo);

        }
        $('.panelbox').RegisterPanelBox();
    })
}

/**
 * layout 参数说明：
 *
 * total： 总条数
 * sizes: 显示每页条数选择框， TODO:pageSizes参数必填,否则无法生效
 * home： 首页按钮
 * prev： 上一页按钮
 * pager： 页码
 * last： 尾页按钮
 * next： 下一页按钮
 * jumper： 输入框跳转（包含事件：失去焦点，回车）触发
 *
 *
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
 });*/



