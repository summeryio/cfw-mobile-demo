var util = {
    /**
     * dropLoadData
     * 视图滑动并加载数据，添加懒加载
     * @param {pageCount} 数据的页数 
     * @param {path} 数据引用的路径  
     */
    dropLoadData: function (pageCount, path) {
        var counter = 0;
        var num = 10; // 每页展示几个
        var pageStart = 2,pageEnd = 0;
        var page=2;

        $("img.lazy").lazyload({
            threshold :100,
            placeholder: '/tpl/wap2019/images/img_default.png'
        });
        
            
        if(pageCount > 1) {
            $('.load-wrapper').dropload({
                scrollArea : window,
                domDown : {
                    domClass   : 'dropload-down',
                    domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
                    domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData  : '<div class="dropload-noData">- 我是有底线的 -</div>'
                },
                loadDownFn : function(me){
                    console.log('data')
                    var template = '';
                    counter++;
                    pageEnd = num * counter;
                    pageStart = pageEnd - num;

                    // for(var i = pageStart; i < pageEnd; i++){
                        $.get("/src/inc/"+path+"",{'pages':page}, function(result){
                            if(result=='0'){
                                return;
                            }
                            template = result

                            if(page >= pageCount) {
                                me.lock();
                                me.noData();
                                return;
                            }
                            page=page+1;      
                        }); 
                    // }

                    setTimeout(function(){
                        $('.load-wrapper .list').append(template);
                        $("img.lazy").lazyload({
                            threshold :100,
                            placeholder: '/tpl/wap2019/images/img_default.png'
                        });
                        // 每次数据加载完，必须重置
                        me.resetload();
                    },1000);
                },
                threshold : 50
            });
        } else {
            console.log('no-data')
            $('.dropload-down').hide()
        }
    },

    /**
     * getQueryString
     * 得到地址栏参数
     * @param {key} 需要的得到的key
     * www.xxx.com?id=111   util.getQueryString('id')
     */
    getQueryString: function (key) {
        var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },

    /**
     * getScript
     * 动态加载js文件
     */
    getScript: function(url, callback) {
        var head = document.getElementsByTagName('head')[0],
            js = document.createElement('script');

        js.setAttribute('type', 'text/javascript'); 
        js.setAttribute('src', url); 

		// head.appendChild(js);
		$(document.body).append(js);

        //执行回调
        var callbackFn = function(){
                if(typeof callback === 'function'){
                    callback();
                }
            };

        if (document.all) { //IE
            js.onreadystatechange = function() {
                if (js.readyState == 'loaded' || js.readyState == 'complete') {
                    callbackFn();
                }
            }
        } else {
            js.onload = function() {
                callbackFn();
            }
        }
    }
}