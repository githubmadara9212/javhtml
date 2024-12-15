$(function($) {
    $.fn.RegisterPanelBox = function() {
        $($(this)).hover(
            //mouse in
            function () {
                $(this).removeClass("PanelBoxBlackBlur");
                $(this).siblings().addClass("PanelBoxBlackBlur");
            },
            //mouse out
            function () {
                $(this).removeClass("PanelBoxBlackBlur");
                $(this).siblings().removeClass("PanelBoxBlackBlur");
            }
        );
    }
})