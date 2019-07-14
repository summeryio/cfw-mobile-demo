window.addEventListener( "load", function() {
	FastClick.attach( document.body );
}, false );

// 显示隐藏导航
var $m_mask = $('#m_mask')

$(document).on('click', '.m-header .icon-nav-extension', function (ev) {
	ev.stopPropagation()
	ev.preventDefault()
	
	$m_mask.show()
	

	if (!$('.header-popup').hasClass('showing')) {
		$('.header-popup').addClass('showing')
		$(document.body).addClass('no-scroll')
	} else {
		$('.header-popup').removeClass('showing')
		$(document.body).removeClass('no-scroll')
		$m_mask.hide()
	}

	$('#category_nav').find('.nav li').removeClass('active')
	$('#category_nav').find('.cont li').removeClass('on')

	$('#category_nav').find('.cont-wrap').hide()
})

// 点击遮罩隐藏导航
$m_mask.on('click', function (ev) {
	$(this).hide()
	$(document.body).removeClass('no-scroll')
	$('.header-popup').removeClass('showing')
	$('#category_nav .cont-wrap').hide()

	$('#category_nav').find('.nav li').removeClass('active')
	$('#category_nav').find('.cont li').removeClass('on')

	ev.stopPropagation();
	ev.preventDefault();
})


// 返回上一页
$(document).on('click', '.m-header .icon-left', function () {
	window.history.back(-1)
})


// 图片懒加载
$("img.lazy").lazyload({
	threshold :50,
	placeholder: '/tpl/wap2020/images/img_default.png'
});
var loadIMGErr = function (_this) {
	_this.src = '/tpl/wap2020/images/img_default.png'
}


// 电话拨打记录
function submitPhone(cat, phone, title) {
	$.post("/tellog.php",{'categoryid': cat,'title': title + phone},function(result){
		return true;
	});
}


// 楼盘详情公共
;(function () {
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 300) {
			$('#house_article #houseDetail_header').show()
		} else {
			$('#house_article #houseDetail_header').hide()
		}
	})
	
	var navid = util.getQueryString('navid')
	$('#houseDetail_header .nav a').eq(navid).addClass('cur').siblings().removeClass('cur')
})()
