var B2C_JCLOUD_MODEL_CONFIG;
//存放页面的全局变量
var B2C_JCLOUD_CONFIG = {
    


};

//数据接口
var B2C_JCLOUD_PORT = {
    searchUrl: '/search/query', // 商品查询接口地址
    getPriceUrl: baseRouteServicePrefix + "/product/getPrice",
    suggestUrl: baseRouteServicePrefix + '/search/hotWords', // 热词接口地址
    predictUrl: baseRouteServicePrefix + '/search/predictWords', // 预测关键词接口地址
    predictDelay: 500 // 预测关键词查询提交延时(ms)
};

//公共方法
var B2C_JCLOUD_HANDLER = {
    // ajax请求
    ajaxInfo: function (param, port, successCB, errorCB, completeCB, async, closeErrLayer) {
        // 调用加载动画
        qk.dialog.loading("show");

        if (async == undefined) {
            async = true;
        } else {
            async ? async = true : async = false;
        }

        $.ajax({
            type: "post",
            url: port,
            dataType: "json",
            data: param,
            async: async,
            success: function (data) {
                successCB && successCB(data, port);
            },
            error: function (data) {
                errorCB && errorCB(data, port);

                if (!closeErrLayer) {
                    qk.layer.msg(qk.errorMsg.error_call);
                }
            },
            complete: function (data) {
                completeCB && completeCB(data, port);
            }
        }).always(function () {
            qk.dialog.loading("hide");
        });
    }
};

var Search = (function() {
    /*程序主对象*/
    function Search() {
        this.init_create();
    }
    Search.prototype = {
        init_create: function(config) {
            // config = 
            //     {
            //         searrchSort: 1,
            //         searchInput: ['searchSkip', 'searchForm'],
            //         searchAssist: ['history', 'suggerter'],
            //         searchResult: ['empty', 'searchResultList']
            //     };
               
            this.searchInput = new SearchInput();
            this.searchSkip = new SearchSkip();
            this.searchForm = new SearchForm();
            this.searchAssist = new SearchAssist();
            this.history = new History();
            this.suggester = new Suggester();
            this.predictor = new Predictor();
            this.searchResult = new SearchResult();
            if(this.isSearchHtml()) {
                this.sort = new Sort();
                this.productList = new ProductList();
                this.empty = new Empty();
                this.recommend  = new Recommend();
                this.scroll = new Scroll();
            }
            // for(var key in config) {
            //     switch(key) {
            //         case 'searchSort': this.sort = new SearchSort(config[key]); 
            //         break;
            //         case 'searchInput': this.searchInput = new SearchIput(config[key]);
            //         break;
            //         case 'searchAssist': this.searchAssist = new SearchAssist(config[key]);
            //         break;
            //         case 'searchResult': this.searchResut = new SearchReuslt(config[key]);
            //         break; 
            //     }
            // }

        },
        init_work: function(data, fp) {
            this.getData(data, fp);
        },
        getData: function(data, fp) {
            this.editData(data, fp);
        },
        editData:function(data, fp) {
            this.renderHtml();
        },
        renderHtml: function() {
            this.bindEvent();
        },
        bindEvent: function() {

        },
        rewritePrototype: function(name, value) {
            Search.prototype[name] = value;
        },
        isSearchHtml: function() {
            return location.pathname.indexOf('search.html') > 0;
        }
    }

    /*搜索区对象*/
    function SearchInput() {
        this.wrapper = $('#searchInput');
        this.init();
    }
    SearchInput.prototype = {
        init: function() {
            this.renderHtml();
        },
        getData: function() {

        },
        editData: function() {

        },
        renderHtml: function() {
            if(this.wrapper.length > 0) this.wrapper.html(template('searchInputTpl', {}));
        },
        bindEvent: function() {

        },
        rewritePrototype: function(name, value) {
            SearchInput.prototype[name] = value;
        }
    }

    /*搜索跳转对象*/
    function SearchSkip() {
        this.wrapper = $('#searchSkip');
    }
    SearchSkip.prototype = {
        init: function() {
            this.getData();
        },
        getData: function() {
            this.editData();
        },
        editData: function() {
            this.renderHtml();
        },
        renderHtml: function() {
            if(this.wrapper.length > 0) this.wrapper.html(template('searchSkipTpl', {}));
            this.bindEvent();
        },
        bindEvent: function() {
            this.toSearchInput = $('#to-search-input');
        },
        rewritePrototype: function(name, value) {
            SearchSkip.prototype[name] = value;
        } 
    }

    /*搜索输入对象*/
    function SearchForm() {
        this.wrapper = $('#searchForm');
    }
    SearchForm.prototype = {
        init: function() {
            this.getData();
        },
        getData: function() {
            this.editData();
        },
        editData: function() {
            this.renderHtml();
        },
        renderHtml: function() {
            if(this.wrapper.length > 0) this.wrapper.html(template('searchFormTpl', {}));
            this.bindEvent();
        },
        bindEvent: function() {
            
        },
        rewritePrototype: function(name, value) {
            SearchForm.prototype[name] = value;
        } 
    }

    /*辅助搜索集对象*/
    function SearchAssist() {
        this.wrapper = $("#searchAssist");
    }
    SearchAssist.prototype = {
        init: function() {

        },
        getData: function() {

        },
        editData: function() {

        },
        renderHtml: function() {

        },
        bindEvent: function() {

        },
        rewritePrototype: function(name, value) {
            SearchAssist.prototype[name] = value;
        }
    }

    /*搜索历史对象*/
    function History() {
        this.wrapper = $('#history');
        this.searchHistory = [];
        this.firstRender = true;
    }
    History.prototype = {
        init: function() {
            this.getData();
        },
        getData: function() {
            var json = $.parseJSON(this.getCookie());
            this.editData(json);
        },
        editData: function(json) {
            this.searchHistory = json ? json : this.searchHistory;
            this.renderHtml();
        },
        renderHtml: function() {
            if(this.wrapper.length > 0) this.searchHistory && this.searchHistory.length > 0 ? this.wrapper.html(template('historyTpl', {searchHistory: this.searchHistory})) : this.wrapper.html('');
            if(this.firstRender) this.firstRender = false, this.bindEvent();
        },
        bindEvent: function() {

        },
        rewritePrototype: function(name, value) {
            History.prototype[name] = value;
        }
    }

    /*搜索热词对象*/
    function Suggester() {
        this.wrapper = $('#suggester');
        this.lastUpdate = 0;
        this.data = null;
    }
    Suggester.prototype = {
        init: function() {
            this.getData();
        },
        getData: function() {
            this.editData();
        },
        editData: function() {
            this.renderHtml();
        },
        renderHtml: function() {
            if(this.wrapper.length > 0) this.wrapper.html(template('suggesterTpl', {}));
            this.bindEvent();
        },
        bindEvent: function() {
            
        },
        rewritePrototype: function(name, value) {
            Suggester.prototype[name] = value;
        }
    }

    /*搜索联想词对象*/
    function Predictor() {
        this.wrapper = $('#predictor');
    }
    Predictor.prototype = {
        init: function() {
            this.getData();
        },
        getData: function() {
            this.editData();
        },
        editData: function() {
            this.renderHtml();
        },
        renderHtml: function() {
            if(this.wrapper.length > 0) this.wrapper.html(template('predictorTpl', {}));
        },
        bindEvent: function() {
            
        },
        rewritePrototype: function(name, value) {
            Predictor.prototype[name] = value;
        }
    }

    /*搜索排序对象*/
    function Sort() {
        this.wrapper = $('#searchSort');
    }
    Sort.prototype = {
        init: function() {
            this.getData();
        },
        getData: function() {
            this.editData();
        },
        editData: function() {
            this.renderHtml();
        },
        renderHtml: function() {
            if(this.wrapper.length > 0) this.wrapper.html(template('searchSortTpl', {}));
            this.bindEvent();
        },
        bindEvent: function() {
            
        },
        rewritePrototype: function(name, value) {
            Sort.prototype[name] = value;
        }
    }

    /*搜索结果区域对象*/
    function SearchResult() {
        this.wrapper = $('#searchResult');
    }
    SearchResult.prototype = {
        init: function() {

        },
        getData: function() {

        },
        editData: function() {

        },
        renderHtml: function() {

        },
        bindEvent: function() {

        },
        rewritePrototype: function() {

        },
        toggle: function() {
            this.wrapper.toggle();
        }

    }

    /*搜索空白对象*/
    function Empty() {
        this.wrapper = $('#searchEmpty');
    }
    Empty.prototype = {
        init: function() {
            this.getData();
        },
        getData: function() {
            this.editData();
        },
        editData: function() {
            this.renderHtml();
        },
        renderHtml: function() {
            if(this.wrapper.length > 0) this.wrapper.html(template('searchEmptyTpl', {}));
            this.bindEvent();
        },
        bindEvent: function() {
            var searchEmptyFlag = $('#search-empty-flag');
            if(searchEmptyFlag && searchEmptyFlag.length > 0) search.productList.noMore = true;
        },
        rewritePrototype: function(name, value) {
            Empty.prototype[name] = value;
        }
    }

    /*搜索推荐对象*/
    function Recommend() {
        this.wrapper = $('#searchRecommend');
    }
    Recommend.prototype = {
        init: function() {
            this.getData();
        },
        getData: function() {
            this.editData();
        },
        editData: function() {
            this.renderHtml();
        },
        renderHtml: function() {
            if(this.wrapper.length > 0) this.wrapper.html(template('searchRecommendTpl', {}));
            this.bindEvent();
        },
        bindEvent: function() {

        },
        rewritePrototype: function(name, value) {
            Recommend.prototype[name] = value;
        }
    }

    /*滚动对象*/
    function Scroll() {
        this.prevLoading = 0;// 上一次加载的时间
    }
    Scroll.prototype = {
        init: function() {
            this.getData();
        },
        getData: function() {
            this.editData();
        },
        editData: function() {
            this.renderHtml();
        },
        renderHtml: function() {
            this.bindEvent();
        },
        bindEvent: function() {
            
        },
        rewritePrototype: function(name, value) {
            Scroll.prototype[name] = value;
        }
    }

    /*搜索结果列表对象*/
    function ProductList() {
        this.wrapper = $('#searchResultList');
        this.param = {}; // 参数
        this.isLoading = false;// 防止瞬间多次加载
        this.noMore = false;// 是否有分页标志
    }
    ProductList.prototype = {
        init: function() {
            this.renderHtml();
        },
        getData: function() {
            
        },
        editData: function() {
            
        },
        renderHtml: function() {
            if(this.wrapper.length > 0) this.wrapper.html(template('searchResultListTpl', {}));
            this.bindEvent();
        },
        bindEvent: function() {
            
        },
        rewritePrototype: function(name, value) {
            ProductList.prototype[name] = value;
        },
        _param: function() {
            var param = {};
            location.search.slice(1).split('&').forEach(function (el) {
                var tokens = el.split('=');
                if(tokens && tokens.length == 2)
                    param[tokens[0]] = tokens[1] ? decodeURI(tokens[1]) : "";
            });
            return param;
        }
    }

    return Search;
})();
var search;

$(function() {
    search = new Search();

    /*============================= main ==============================*/
    search.rewritePrototype("renderHtml", function() {
        this.searchSkip.init();
        this.searchForm.init();
        this.history.init();
        this.suggester.init();
        this.empty.init();
        this.recommend.init();
        this.productList.init();
        this.scroll.init();
    })
    search.rewritePrototype('toggle', function() {
        search.searchSkip.toggle();
        search.searchForm.toggle();
        search.searchAssist.toggle();
        search.searchResult.toggle();
    })

    /*============================= 搜索跳转 ==============================*/
    search.searchSkip && search.searchSkip.rewritePrototype('bindEvent', function() {
        this.inputSpan = $('#ms-jsSearchTxt');
        this.toSearchInput = $('#to-search-input');
        this.wrapper.on("click", this.toSearchInput, function() {
            search.toggle();
        })
    })
    search.searchSkip && search.searchSkip.rewritePrototype('toggle', function() {
        this.wrapper.toggle();
    })

    /*============================= 搜索输入 ==============================*/
    search.searchForm && search.searchForm.rewritePrototype('bindEvent', function() {
        var that = this;
        this.searchKeyword = $('#search_keyword'); // 输入框
        this.searchCancel = $('#search-cancel'); // 取消
        $('form').on('submit', function(event) {
            return false;
        })
        this.wrapper.on('keypress', this.searchKeyword, function(event) {
            
            if ((event.key && event.key === 'Enter') || event.which === 13) {
                if(that.getKeyword()) {
                    search.history.setCookie(that.getKeyword());
                    location.href = "/search.html?q=" + that.getKeyword();
                }else {
                    qk.layer.msg("关键词不能为空");
                }
            }
            //event.preventDefault();
            // return false;
        })
        this.wrapper.on('click', '#search-cancel', function(event) {
            search.toggle();
            // if(search.productList) search.productList.toggle();
        })
    })
    search.searchForm && search.searchForm.rewritePrototype('getKeyword', function() {
        return this.searchKeyword.val().trim();
    })
    search.searchForm && search.searchForm.rewritePrototype('setKeyword', function(keyword, goSearch) {
        if(keyword && $('.ms-list .ms-list-item').length > 0) {// 搜索有商品
            search.searchSkip.inputSpan.html(keyword);
            search.searchSkip.toSearchInput.removeClass("ms-toSearchInput").addClass('ms-searchInput');
        }
        return this;
    })
    search.searchForm && search.searchForm.rewritePrototype('toggle', function() {
        this.wrapper.toggle();
    })

    /*============================= 辅助搜索集 ==============================*/
    // 辅助搜索集区域显示隐藏
    search.searchAssist && search.searchAssist.rewritePrototype('toggle', function() {
        this.wrapper.toggle();
    })
    
    /*============================= 搜索历史 ==============================*/
    // 历史区块显示隐藏
    // search.history && search.history.rewritePrototype('toggle', function() {
    //     this.wrapper.toggle();
    // })
    search.history && search.history.rewritePrototype('show', function() {
        this.wrapper.show();
    })
    search.history && search.history.rewritePrototype('hide', function() {
        this.wrapper.hide();
    })
    // 写cookie
    search.history && search.history.rewritePrototype('setCookie', function(value) {
        for(var i=0, len=this.searchHistory.length; i < len; i++) {
            if(this.searchHistory[i] === value) {
                this.searchHistory.splice(i,1);
            }
        }
        value ? this.searchHistory.unshift(value) : "";
        var exp = new Date();
        exp.setTime(exp.getTime() + 315360000000);
        document.cookie = "ms_history="+ escape(JSON.stringify(this.searchHistory)) + ";expires=" + exp.toGMTString() + "path=/";
    })
    // 读cookie
    search.history && search.history.rewritePrototype('getCookie', function(name) {
        var arr,reg=new RegExp("(^| )"+(name || 'ms_history')+"=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        }else{
            return null;
        }
    })
    // 记录搜索事件回调统一入口
    search.history && search.history.rewritePrototype('handler', function(event) {
        if (!$(event.currentTarget).attr("href")) {
            var keyword = $(event.currentTarget).text();
            search.history.setCookie(keyword);
            location.href = '/search.html?q=' + keyword;
        }
    })
    // 历史搜索事件绑定
    search.history && search.history.rewritePrototype('bindEvent', function() {
        this.wrapper.on('click', 'a', this.handler);
        this.wrapper.on('click', '#ms-icon-del', function() {
            this.searchHistory.splice(0, this.searchHistory.length);
            this.renderHtml();
            this.setCookie();
        }.bind(this));
    })

    /*============================= 搜索热词 ==============================*/
    search.suggester && search.suggester.rewritePrototype('getData', function() {
        var that = this;
        $.ajax({
            url: B2C_JCLOUD_PORT.suggestUrl,
            dataType: "json",
            success: function (json) {
                that.lastUpdate = Date.now();
                if(json.isSuccess) {
                    that.editData(json);
                }
            }
        });
    })
    search.suggester && search.suggester.rewritePrototype('editData', function(json) {
        this.data = json.data;
        if(this.data && this.data.length > 0) this.renderHtml();
    })
    search.suggester && search.suggester.rewritePrototype('renderHtml', function() {
        if(this.wrapper.length > 0) this.wrapper.html(template('suggesterTpl', {suggester: this.data}));
        this.bindEvent();
    })
    search.suggester && search.suggester.rewritePrototype('bindEvent', function() {
        var that = this;
        this.wrapper.on('click', 'a', search.history.handler);
    })

    /*============================= 搜索联想词 ==============================*/
    search.predictor && search.predictor.rewritePrototype('getData', function() {
        var that = this;
        $.ajax({
            url: B2C_JCLOUD_PORT.predictUrl + '?q=' + search.searchForm.getKeyword(),
            dataType: "json",
            success: function (json) {
                json = $.parseJSON(json);
                if(json.isSuccess) {
                    that.data = json.data;
                    that.editData();
                }
            }
        });
    })
    // 处理数据
    search.predictor && search.predictor.rewritePrototype('editData', function(json) {
        if(this.data && this.data.length > 0) {
            this.renderHtml();
            this.show();
        }else {
            this.hide();
        }

    })
    // 渲染
    search.predictor && search.predictor.rewritePrototype('renderHtml', function() {
        if(this.wrapper.length > 0) this.wrapper.html(template('predictor-tpl', {}));
    })
    search.predictor && search.predictor.rewritePrototype('bindEvent', function() {
        this.wrapper.on('click', 'a', search.history.handler);
    })
    search.predictor && search.predictor.rewritePrototype('show', function() {
        this.wrapper.show();
    })
    search.predictor && search.predictor.rewritePrototype('hide', function() {
        this.wrapper.hide();
    })

    /*============================= 搜索排序 ==============================*/
    // 排序搜索事件绑定
    search.sort && search.sort.rewritePrototype('bindEvent', function() {
        this.wrapper.on('click', 'li', function (ev) {
            var $target = $(ev.currentTarget);
            switch ($target.attr('data-type')) {
                case 'default':// 默认
                    $('.act').removeClass('act');
                    search.productList.param.sort = null;
                    search.productList.param.sort3 = null;
                    this.wrapper.find('[data-type=default]').addClass('cur').siblings().removeClass('cur');
                    this.wrapper.find('[data-type=price]').removeAttr('data-value');
                    break;
                case 'price':// 价格排序
                    $('.act').removeClass('act');
                    search.productList.param.sort = search.productList.param.sort === 'asc' ? 'desc' : 'asc';
                    search.productList.param.sort3 = null;
                    this.wrapper.find('[data-type=price]').addClass('cur').siblings().removeClass('cur');
                    ;
                    if (search.productList.param.sort === 'asc') {
                        $('.icon-jiageshangbiao').addClass('act');
                    } else {
                        $('.icon-jiagexiabiao').addClass('act');
                    }
                    break;
                case 'sales':// 销售降序
                    $('.act').removeClass('act');
                    search.productList.param.sort = null;
                    search.productList.param.sort3 = 'desc';
                    this.wrapper.find('[data-type=sales]').attr('data-value', search.productList.param.sort).addClass('cur').siblings().removeClass('cur');
                    ;
                    this.wrapper.find('[data-type=price]').removeAttr('data-value');
                    break;
                case 'availability':// 是否有货
                    search.productList.param.stock = search.productList.param.stock ? 0 : 1;
                    if (search.productList.param.stock == 1) {
                        this.wrapper.find('.icon-xuanzekuang').addClass('icon-xuanzhongkuang');
                    } else {
                        this.wrapper.find('.icon-xuanzekuang').removeClass('icon-xuanzhongkuang');
                    }
                    break;
            }
            if (!search.productList.param.q) {
                search.searchForm.setKeyword($('#search_keyword').attr('placeholder'));
            }
            // 初始化相关参数
            search.productList.noMore = false;
            search.productList.param.page = 1;
            search.productList.getData(true);
        }.bind(this));
    })
    // 排序区块显示隐藏
    search.sort && search.sort.rewritePrototype('toggle', function() {
        this.wrapper.toggle();
    })

    /*============================= 搜索滚动 ==============================*/
    search.scroll && search.scroll.rewritePrototype('bindEvent', function() {
        var that = this;
        $(document).on('scroll.search-result.more', function(event) {
            var delay = 200;// 两次加载的间隔时间
            var now = Date.now();
            var nearBottom = $(window).scrollTop() + $(window).height() >= $(document).height() - $(window).height();

            if (!that.prevLoading || now - that.prevLoading > delay) {
                if (!search.productList.isLoading && !search.productList.noMore && nearBottom) {
                    $('#carry,#request-failed').remove();
                    search.productList.isLoading = true;
                    search.productList.param.page = (search.productList.param.page || 1) + 1;
                    search.productList.getData();
                }
                that.prevLoading = now;
            }
        });
    })

    /*============================= 搜索产品列表 ==============================*/
    // 请求数据统一接口
    search.productList && search.productList.rewritePrototype('getData', function(replace) {
        var that = this;
        qk.dialog.loading("show");
        this.productList.loadAppend(B2C_JCLOUD_PORT.searchUrl, this.param, function (response, status, xhr) {
            that.isLoading = false;
            qk.dialog.loading("hide");
            if (status != "success") {
                that.restorePageCode(replace);
                // 网络繁忙......
                return qk.layer.msg(qk.errorMsg.error_return);
            }
            that.editData();
        }, function() {
            that.isLoading = false;
            qk.dialog.loading("hide");
            that.restorePageCode(replace);
            // 网络繁忙......
            qk.dialog.alert(qk.errorMsg.error_return);
        }, replace)
    })
    // 处理数据
    search.productList && search.productList.rewritePrototype('editData', function() {
        var $noMore = $('#nomore-flag');
        $noMore.length && (this.noMore = true);
        this.triggerGetPrice();
    })
    // 查询价格
    search.productList && search.productList.rewritePrototype('triggerGetPrice', function() {
        var $carry = $('#carry');
        var skuId = '';
        $carry.length && (skuId = $carry.data("skuid") || '') && qk.getPrice(skuId, this.renderProductPrice, 3);
    })
    // 价格查询回调
    search.productList && search.productList.rewritePrototype('renderProductPrice', function(data, skuIds) {
        var querySkuIds = [];
        if(data && data.isSuccess && data.data) {
            for (var i = 0; i < data.data.length; i++) {
                if ($('[name="sku_price_' + data.data[i].id + '"]').length > 1) {
                    // console.log(data.data[i].id);
                }
                if (Number(data.data[i].p) > Number("0.00")) {
                    $('[name="sku_price_' + data.data[i].id + '"]').html(data.data[i].p);
                } else {
                    $('[name="sku_price_' + data.data[i].id + '"]').html('暂无报价');
                }
                querySkuIds.push(data.data[i].id);
            }
        }
        if(skuIds){
            var oldSkuIds = skuIds.toString().split(',');
            for (var i = 0; i < oldSkuIds.length; i++) {
                var isExist = false;
                for (var j = 0; j < querySkuIds.length; j++) {
                    if (oldSkuIds[i] == querySkuIds[j]) {
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    $('[name="sku_price_' + oldSkuIds[i] + '"]').html('暂无报价');
                }
            }
        }
    })
    // 异步请求后修改页码
    search.productList && search.productList.rewritePrototype('restorePageCode', function(replace) {
        if (!replace && this.param.page && this.param.page > 1) {
            this.param.page--;
        }
    })
    // 事件绑定
    search.productList && search.productList.rewritePrototype('bindEvent', function() {
        this.productList = $('#product-list');
        this.param = this._param();
        search.searchForm.setKeyword(this.param.q);
        this.editData();
    })
    

    var fpObj = eval('(' + $("#fp").val() + ')');
    search.init_work('data', fpObj);

})



