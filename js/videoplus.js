$(function() {
    $("#javframeid").click(function (event) {
        let element=event.target;
        if(element.className=="panelvideo"){
            let elebox=element.parentNode;
            let src=elebox.getAttribute("URL");
            let time=element.currentTime;
            let poturl="potplayer://"+src+" /seek="+time;
            open(poturl);
        }
    })
})