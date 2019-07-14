var util = {
    /**
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
    getQueryString: function (key) {
        var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
}