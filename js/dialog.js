/*
*  手机端报名弹窗JS
*/
var signup_title,signup_id,signup_text; // 这些是全局变量

;(function () {
    var signuped = false

    $('.showing_dialog').on('click', function(ev){
        ev.stopPropagation();
        
        $('body').addClass('no-scroll')
        
        var $that = $(this);

        parent.signup_title = $that.attr('data-name');
        parent.signup_id = $that.attr('data-id');
        parent.signup_text = $that.attr('data-text');
        parent.signup_buttom = $that.attr('data-buttom');

        if (!signuped) {
            signuped = true
            CreatePopLayerDiv('/tpl/wap2020/template/dialog.html');
        } else {
            $("#InDiv").show();

            $('.m_form_title span').html(signup_title);
            $('.m_form_title p').html(signup_text);

            if (signup_buttom) {
                $('.m_form input[type="button"]').val(signup_buttom);
            }else{
                $('.m_form input[type="button"]').val('提交');
            }
        }
    })

    function CreatePopLayerDiv(url){
        var div ='<div id="InDiv" style="width:100%;height:100%;background:rgba(0,0,0,0.6);position:fixed;z-index:10000;top:0;left:0;">';
        div+='<div class="content"></div>';
        div+='</div>';
        $(document.body).append(div);

        if(url != ""){
            $("#InDiv .content").load(url);
        }
    }
})()