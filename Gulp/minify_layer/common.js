// 扩展方法 loadAppend
/**
 * $(selector).loadAppend(url, data, callback_succ, callback_err)
 * @param {String} url
 * @param {Object} data, 存在则默认使用POST方式发送
 * @param {Function} callback, 有三个参数reponse(响应数据)、status(响应状态)、xhr(请求对象)
 */
;(function ($) {
    $.extend($.fn, {
        loadAppend: function (url, data, success, error, replace) {
            // handle optional data/success arguments
            function parseArguments(e, n, r, f, i) {
                return $.isFunction(n) && (i = f, f = r, r = n, n = void 0), $.isFunction(f) || (i = f, f = void 0),
                    {
                        url: e,
                        data: n,
                        success: r,
                        error: f,
                        dataType: i
                    }
            }

            var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
            if (!this.length) return this;
            var self = this, parts = url.split(/\s/), selector,
                options = parseArguments(url, data, success, error),
                callback = options.success,
                callback_err = options.error;
            if (parts.length > 1) options.url = parts[0], selector = parts[1];
            options.success = function (response) {
                var errorPageFlag = $('<div>').html(response.replace(rscript, "")).find("#loadappend-failed");
                if(errorPageFlag && errorPageFlag.length > 0) {
                    qk.page.loadAppendFailed(errorPageFlag);
                    arguments[1] = "error";
                    callback && callback.apply(self, arguments);
                } else {
                    if (!replace) {
                        self.append(selector ?
                            $('<div>').html(response.replace(rscript, "")).find(selector)
                            : response)
                        callback && callback.apply(self, arguments)
                    } else {
                        self.html(selector ?
                            $('<div>').html(response.replace(rscript, "")).find(selector)
                            : response)
                        callback && callback.apply(self, arguments)
                    }
                } 
                
            };
            options.error = function (response) {
                callback_err && callback_err.apply(self, arguments);
            }
            if (!$.isFunction(data)) options.type = "POST";
            $.ajax(options);
            return this;
        }
    })
})(Zepto);

;(function (win) {
    var doc = win.document;
    var docEle = doc.documentElement;
    var timer = null;
    function setHtmlFontSize () {
        var deviceWidth = win.screen.width > 0 && win.innerWidth <= win.screen.width ? win.screen.width : win.innerWidth,
            htmlFontSize = deviceWidth > 1080 ? 144 : deviceWidth / 7.5;
        htmlFontSize = htmlFontSize > 32 ? htmlFontSize : 32;

        docEle.style.fontSize = htmlFontSize + 'px';
    }

    win.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(setHtmlFontSize, 300);
    }, false);
    win.addEventListener('pageshow', function (e) {
        if(e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(setHtmlFontSize, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = "12px";
    } else {
        doc.addEventListener('DOMContentLoaded', function (e) {
            doc.body.style.fontSize = "12px";
        }, false);
    }

    setHtmlFontSize();
})(window);

// 图片HTTPS
String.prototype.protocol = function () {

    var str = this;

    str = window.isSupportWebp ? (str.replace(/(\.jpg|\.png)/g, ".webp")) : str;

    return str.replace(/http:\/\/p\d\.qh[imgs]{3}/, "https://p.ssl.qhmsg");
};
// 自动适配协议
String.prototype.authorProtocol = function () {

    var str = this.replace("quc.qhimg", "p8.qhimg");

    str = window.isSupportWebp ? (str.replace(/(\.jpg|\.png)/g, ".webp")) : str;

    return str.replace(/http:\/\/p\d\.qh[imgs]{3}/, "https://p.ssl.qhmsg");
};

// 图片剪裁
String.prototype.drImage = function (w, h) {
    var url = this;
    var httpReg = /^http:\/\/p\d*\.qh(img|msg)\.com\//;
    var httpsReg = /^https:\/\/p\d*\.ssl\.qh(img|msg)\.com\//;
    h = h || w;

    if (httpReg.test(url)) {
        return url.replace(httpReg, function (all) {
            return all + 'dr/' + [w, h, '/'].join('_')
        });
    } else if (httpsReg.test(url)) {
        return url.replace(httpsReg, function (all) {
            return all + 'dr/' + [w, h, '/'].join('_');
        });
    } else {
        return url;
    }
};
try {
    $.ajaxSettings.cache = false;
} catch (err) {
}
try {
    $.ajaxSetup({
        cache: false
    });
} catch (err) {
}

//app端请求的userAgent
var appUserAgent = nodeParam.appUserAgent;
function appHideMenu() {
    //如果使用此页面的是app端 隐藏掉头部的返回箭头和菜单图标
    if (navigator.userAgent.toLocaleLowerCase().indexOf(appUserAgent.toLocaleLowerCase()) > 0) {
        $('#mod-sell-nav-header').hide();
        $('#mod-sell-nav-footer').hide();
    }
}
$(document).ready(function () {
    HistoryStock.option.pushData();
    appHideMenu();
});

var qk = {};
qk.changeIScrollTop = function (callback) {
    if (navigator.userAgent.toLocaleLowerCase().indexOf(appUserAgent.toLocaleLowerCase()) > 0) {
        var headerLineHeight = $('#mod-sell-nav-header').css("line-height");
        var htmlFontSize = $("html").css("font-size");
        var headerLineHeightRemNum = 0;
        if(headerLineHeight){
            if(htmlFontSize.indexOf("px") > -1){
                htmlFontSize = htmlFontSize.replace("px","");
            }
            if(headerLineHeight.indexOf("rem") > -1){
                headerLineHeightRemNum = headerLineHeight.replace("rem","");
            }else if(headerLineHeight.indexOf("px") > -1){
                headerLineHeight = headerLineHeight.replace("px","");
                headerLineHeightRemNum = headerLineHeight/htmlFontSize;
            }
        }
        if (callback && typeof callback == "function") {
            callback(-headerLineHeightRemNum,0);
        }
    }
};

qk.history = (function () {
    var back = function (url) {
        if(url){
            HistoryStock.option.popData();
            location.href = url;
        }else{
            var backUrl = HistoryStock.option.getBackUrl();
            if(backUrl){
                location.href = backUrl;
            }else{
                window.history.go(-1);
            }

        }
    };
    return {
        back: back
    }
})();

// 商城顶部导航条
qk.sellNav = (function () {
    var pathNames = ['/mycoupon.html', '/myorder.html', '/myfavourite.html', '/user_address.html', '/myreturnlist.html', '/myreturnapply.html', '/myrefundlist.html'];
    var setCart = function () {
        $.get(baseRouteServicePrefix + "/cart/getSkuNum", function (data) {
            if (data && data.isSuccess && data.isSuccess == true) {
                var showNum = data.data;
                if (data.data == 0) {
                    showNum = '';
                    $('#qkNavCartNum').hide();
                    $('#qkBottomCartNum').hide();
                    $('#qkNavPopMsg').removeClass('msg-pop');
                } else {
                    $('#qkNavCartNum').show();
                    $('#qkBottomCartNum').show();
                    $('#qkNavPopMsg').addClass('msg-pop');
                }
                if (showNum > 99) {
                    showNum = '99+';
                }
                $('#qkNavCartNum').text(showNum);
                $('#qkBottomCartNum').text(showNum);
            } else {
                $('#qkNavCartNum').hide();
                $('#qkBottomCartNum').hide();
                $('#qkNavPopMsg').removeClass('msg-pop');
            }
        }, 'json');
    }

    var isMy = function (pathname) {
        for (var i = 0; i <= pathNames.length; i++) {
            if (pathname === pathNames[i]) return true;
        }
        return false;
    }

    var init = function () {
        $('#qkNavMenu').click(function () {
            var qkNavMenuBox = $('#qkNavMenuBox');
            qkNavMenuBox.toggle();
            $(this).attr('box-display', qkNavMenuBox.css('display'));
        });
        if (isMy(location.pathname)) {
            setBack(function () {
                var hash = location.hash;
                if (hash && hash != '#') {
                    location.href = location.pathname;
                } else {
                    qk.history.back("/usercenter.html");
                    //location.href = "/usercenter.html";
                }
            })
        } else {
            setBack();
        }
        setCart();
    }

    var setBack = function (callback) {
        $('#qkNavBackBtn').unbind("click");
        if (callback) {
            $('#qkNavBackBtn').click(callback);
        } else {
            $('#qkNavBackBtn').click(function () {
                qk.history.back();
                //window.history.go(-1);
            });
        }
    }

    var setNavMenu = function (callback) {
        if (callback) {
            $('#qkNavMenu').click(callback);
        }
    }

    var title = function (str) {
        if (str === undefined) {
            return $('#qkNavTitle').html()
        } else {
            $('#qkNavTitle').html(str)
        }
    }

    return {
        init: init,
        title: title,
        setBack: setBack,
        setNavMenu: setNavMenu
    }
})();

// 弹窗
qk.dialog = (function () {
    var eleDialog, eleDialogMain;


    var show = function (cfg) {
        cfg = $.extend({
            content: '',
            width: '85%'
        }, cfg);

        var html = [
            '<div class="mod-dialog">',
            '<div class="dialog-main">',
            cfg.content,
            '</div>',
            '<div class="dialog-bg"></div>',
            '</div>'
        ].join('');

        eleDialog = $(html).appendTo('body');

        eleDialogMain = eleDialog.find('.dialog-main').width(cfg.width);
        eleDialogMain.css({
            marginLeft: -eleDialogMain.width() / 2,
            marginTop: -eleDialogMain.height() / 2
        })


        // 点击遮罩层任意位置，遮罩层、警告窗关闭
        eleDialog.find('.dialog-bg').click(function () {
            cfg.fnOk && cfg.fnOk();
            hide();
        })


        eleDialog.find('.dialog-close').click(function () {
            hide();
        })

        return eleDialog;
    }

    var hide = function () {
        eleDialog.hide();
    }

    return {
        show: show,
        hide: hide
    }
});


qk.dialog.confirm = function (cfg) {
    cfg = $.extend({
        html: '',
        cancelText: '取消',
        okText: '确定',
        sureCallback: null,
        cancelCallback: null
    }, cfg);

    var html = [
        '<div class="confirm-content clearfix">',
        cfg.html || '',
        '</div>',
        '<div class="confirm-console flexbox">',
        '<a href="#" onclick="return false;" class="btn-cancel flexitem">' + cfg.cancelText + '</a>',
        '<a href="#" onclick="return false;" class="btn-ok flexitem">' + cfg.okText + '</a>',
        '</div>'
    ].join('');

    var d = new qk.dialog;
    var eleDialog = d.show({
        content: html
    });

    eleDialog.find('.btn-cancel').click(function () {
        var ret = cfg.fnCancel && cfg.fnCancel();

        if (ret !== false) {
            d.hide();
        }
        ;

        if (cfg.cancelCallback && typeof cfg.cancelCallback == "function") {
            return cfg.cancelCallback();
        }
        ;
    });

    eleDialog.find('.btn-ok').click(function () {
        var ret = cfg.fnOk && cfg.fnOk();

        if (ret !== false) {
            d.hide();
        }
        ;
        if (cfg.sureCallback && typeof eval(cfg.sureCallback) == "function") {
            return cfg.sureCallback;
        }
        ;
    });

    return eleDialog;
};

qk.dialog.alert = function () {
    var cfg = {
        html: '',
        okText: '确定'
    };

    if (arguments.length == 2) {
        cfg = $.extend(cfg, {
            html: arguments[0],
            fnOk: arguments[1]
        })
    } else if (arguments.length == 1 && typeof arguments[0] == 'object') {
        cfg = $.extend(cfg, arguments[0]);
    } else if (arguments.length == 1) {
        cfg = $.extend(cfg, {
            html: arguments[0]
        })
    }

    var html = [
        '<div class="confirm-content clearfix">',
        cfg.html || '',
        '</div>',
        '<div class="confirm-console flexbox">',
        '<a href="#" onclick="return false;" class="btn-ok flexitem">' + cfg.okText + '</a>',
        '</div>'
    ].join('');

    var d = new qk.dialog;
    var eleDialog = d.show({
        content: html,
        fnOk: cfg.fnOk
    })

    eleDialog.find('.btn-ok').click(function () {
        var ret = cfg.fnOk && cfg.fnOk();

        if (ret !== false) {
            d.hide();
        }
    })

    return eleDialog
};

qk.dialog.loading = function (flag) {
    var $loading = $(".Loading");
    var $body = $("body");
    if (!($loading.length > 0)) {
        var html = '<div class="Loading" style="display:none;"><img src="' + nodeParam.staticPath + '/images/loading.gif"></div>';
        $body.prepend(html);
        $loading = $(".Loading");
        var maxHeight = null;
        document.documentElement.clientHeight >= $body.height() ? maxHeight = document.documentElement.clientHeight : maxHeight = $body.height();
        $loading.on("touchmove", function (e) {
            // 禁用手指滑动事件
            e.preventDefault();
        });
    }
    if (flag == "hide") {
        $loading.hide();
    }
    if (flag == "show") {
        $loading.show();
    }
};

qk.layer = {};
qk.layer.msg = function (msg) {
    msg = msg || "页面出错";
    layer.open({
        content: msg,
        skin: 'msg',
        style: 'bottom:0',
        time: 2 //2秒后自动关闭
    });
    //Modal.tip({content: msg, time: 2000});
};

qk.backTop = function (domName) {
    if (domName && (domName.indexOf(".") > -1 || domName.indexOf("#") > -1)) {
        var $w = $(window);
        var $b = $(domName);
        var h = $w.height();
        $w.scroll(function () {
            var t = $w.scrollTop();
            t > h ? $b.show() : $b.hide();
        });
        $b.on("click", function () {
            $w.scrollTop(0, 0);
        });
    }
};

qk.passport = (function () {
    var addRandom = function (url) {
        var str = url.indexOf('?') > -1 ? '&' : '?';

        url = url.indexOf('#') > -1 ? url : url + "";

        return url.split('#').join(str + "time=" + (+new Date()))

    };

    var normalLogin = function (jumpurl) {
        var href = jumpurl || location.href;
        href = addRandom(href);

        if (href.indexOf(location.origin) != 0) {
            href = location.origin + href;
        }
        var url = nodeParam.loginUrl + (new Date().getTime()) + "&returnUrl=" + encodeURIComponent(href);

        window.location.href = url;
    };

    return {
        login: normalLogin
    }
})();

qk.getCssRemNumber = function (remValue) {
    var result = 0;
    if (remValue) {
        result = Number(remValue.replace('rem', ''));
        if (result == 'NaN' || !result) {
            result = 0;
        }
        return result;
    } else {
        return 0;
    }
};

// 批量商品价格查询（支持单个商品查询,skuIds必须是逗号分隔的字符串）
qk.getPrice = function (skuIds, callBack, maxAjaxTimes) {

    maxAjaxTimes && maxAjaxTimes--;

    $.ajax({
        type: "post",
        url: baseRouteServicePrefix + "/product/getPrice",
        dataType: "json",
        data: {"skus": skuIds},
        success: function (data) {
            if (data && data.isSuccess && data.data) {
                typeof callBack == "function" && callBack(data, skuIds);
                return;
            } else {
                if (maxAjaxTimes == 0) {
                    callBack(data, skuIds);
                }
            }
            if (maxAjaxTimes && maxAjaxTimes > 0) {
                qk.getPrice(skuIds, callBack, maxAjaxTimes);
            }
        },
        error: function (data) {
            //qk.layer.msg(qk.errorMsg.error_call);
        }
    });
};

qk.getAllProductPrice = function (skuIds, callBack, maxAjaxTimes) {

    maxAjaxTimes && maxAjaxTimes--;

    $.ajax({
        type: "post",
        url: baseRouteServicePrefix + "/product/getAllProductPrice",
        dataType: "json",
        data: {"skus": skuIds},
        success: function (data) {
            if (data && data.isSuccess && data.data) {
                typeof callBack == "function" && callBack(data, skuIds);
                return;
            } else {
                if (maxAjaxTimes == 0) {
                    callBack(data, skuIds);
                }
            }
            if (maxAjaxTimes && maxAjaxTimes > 0) {
                qk.getAllProductPrice(skuIds, callBack, maxAjaxTimes);
            }
        },
        error: function (data) {
            //qk.layer.msg(qk.errorMsg.error_call);
        }
    });
};

// 获取url中的参数
qk.getUrlParam = function (param) {
    var params = location.search.substr(1).split("&");
    var val = ""
    $.each(params, function (i, str) {
        var arr = str.split('=');
        if (arr[0] == param) {
            val = arr[1]
        }
    })
    return val;
}

// 定时校验倒计时
var interval = null;
qk.getNowTime = (function (waitMs, cb) {
    function NowTime(waitMs, cb) {
        clearInterval(interval);
        interval = setInterval(function () {
            $.ajax({
                type: "get",
                url: baseRouteServicePrefix + "/reserve/getNowTime",
                dataType: "json",
                data: "",
                success: function (data) {
                    if (data && data.isSuccess && data.data) {
                        cb(data);
                    }
                },
                error: function () {

                }
            });
        }, waitMs)
    }

    return NowTime;
})();

qk.getTimeShowStr = function (timeInMillion) {
    var time = new Date(timeInMillion);
    var timeShowStr = {};
    timeShowStr.year = time.getFullYear();
    timeShowStr.month = time.getMonth() + 1;
    timeShowStr.day = time.getDate() > 9 ? time.getDate() : "0" + time.getDate();
    timeShowStr.hour = time.getHours() > 9 ? time.getHours() : "0" + time.getHours();
    timeShowStr.minute = time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
    timeShowStr.second = time.getSeconds() > 9 ? time.getSeconds() : "0" + time.getSeconds();
    return timeShowStr;
};
qk.getTimeShowStr2Millisec = function (dateStr) {
    dateStr = String(dateStr);
    var t = new Date();
    t.setFullYear(dateStr.slice(0, 4));
    t.setMonth(dateStr.slice(4, 6) - 1);
    t.setDate(dateStr.slice(6, 8));
    t.setHours(dateStr.slice(8, 10));
    t.setMinutes(0);
    t.setSeconds(0);
    t.setMilliseconds(0);
    return t.getTime();
};

//自定义弹窗
var Popup = function () {
    this._init.apply(this, arguments)
}
$.extend(Popup.prototype, {
    _init: function (cfg) {
        cfg = cfg || {}, this.mask = $(cfg.mask || ".mask"), this.popup = $(cfg.popup || ".popup"), this.template = cfg.template || "popup-template";
        if (!this.mask.length) {
            this.mask = $('<div class="mask"></div>').appendTo('body');
        }
        if (!this.popup.length) {
            this.popup = $('<div class="popup"></div>').appendTo('body');
        }
        this.bindEvents();
    },
    show: function () {
        this.mask.add(this.popup).show();
        this.resetPos();
    },
    hide: function () {
        this.mask.add(this.popup).hide();
    },
    setContent: function (e, callback) {
        var html = template(this.template, e);
        this.popup.html(html);
        this.show();
        callback && callback(this.popup);
    },
    bindEvents: function () {
        var self = this;
        $(document).on("click", ".btn-close", function (e) {
            e.preventDefault();
            self.hide();
        })
    },
    resetPos: function () {
        var viewportH = window.innerHeight || document.documentElement.clientHeight || 100;
        var top = viewportH - this.popup.height();
        if (this.popup.height() > viewportH / 2) {
            this.popup.css('position', 'absolute');
            top += $('body').scrollTop();
            this.popup.css({
                left: 0,
                top: top,
                width: '100%',
                marginTop: '0px'
            });
        } else {
            this.popup.css('position', 'fixed');
            this.popup.css({
                left: '5%',
                top: '50%',
                width: '90%',
                marginTop: '-' + this.popup.height() / 2 + 'px'
            });
        }
    }
});

qk.errorMsg = {
    "error_return": "抱歉，出错了，请稍后再试",
    "error_call": "抱歉，网络繁忙，请稍后再试",
    "error_quick_operate": "抱歉，操作过快，请稍后再试"
};
/**
 * 统一判断返回值
 * @param data
 * @returns {boolean}
 */
qk.checkAjaxData = function (data) {
    if (!data) {
        qk.layer.msg(qk.errorMsg.error_return);
        return false;
    }
    if (!data.isSuccess) {
        //此处判定用户是否登录
        if (data.errorCode == -1) {
            goLogin(data.msg);
            return false;
        }
        //请求失败弹窗
        qk.layer.msg(data.msg);
        return false;
    }
    return true;
};

/**
 * 地址插件内回显方法(依赖mobileSelect.js插件)
 */
qk.addressBackShow = function (moduleName, _areaIdObj) {
    /*由于各页面传递的_areaIdObj参数对象的key值不同,此处重新复制到一个统一的对象内*/
    var areaIdObj = {
        province: _areaIdObj.province || _areaIdObj.provinceId,
        city: _areaIdObj.city || _areaIdObj.cityId,
        county: _areaIdObj.county || _areaIdObj.countyId,
        town: _areaIdObj.town || _areaIdObj.townId
    };

    /*地址回显方法*/
    var province, city, county;
    var provinceId, cityId, countyId;
    for (var e in country_Json) {
        if (country_Json[e].c == areaIdObj.province) {
            moduleName.checkRange(0, [e]);
            moduleName.locatePostion(0, e);
            province = country_Json[e];
            provinceId = e;
            break;
        }
    }
    for (var f in province.s) {
        if (province.s[f].c == areaIdObj.city) {
            city = province.s[f];
            moduleName.checkRange(1, [provinceId, f]);
            moduleName.locatePostion(1, f);
            cityId = f;
            break;
        }
    }
    for (var g in city.s) {
        if (city.s[g].c == areaIdObj.county) {
            county = city.s[g];
            moduleName.checkRange(2, [provinceId, cityId, g]);
            moduleName.locatePostion(2, g);
            countyId = g;
            break;
        }
    }
    var areaStr = province.n + ' ' + city.n + ' ' + county.n;
    if (areaIdObj.hasOwnProperty("town")) {
        for (var h in county.s) {
            if (county.s[h].c == areaIdObj.town) {
                areaStr += ' ' + county.s[h].n;
                moduleName.locatePostion(3, h);
                break;
            }
        }
    }
    return areaStr; // 返回地址文字
};

/*地址数据回显*/
qk.backAreaText = function (areaData, first, twoThird) {
    if (areaData.areaId) {
        var arr = areaData.areaId.split("-"),
            proId = arr[0] || "0",
            cityId = arr[1] || "0",
            countyId = arr[2] || "0",
            townId = arr[3] || "0",
            area = '';
    } else {
        /*shop_order页调用的是getAddressById接口, 无areaId字段,故作如下处理*/
        /*由于各页面传递的_areaIdObj参数对象的key值不同,此处重新复制到一个统一的对象内*/
        var areaIdObj = {
            province: areaData.province || areaData.provinceId,
            city: areaData.city || areaData.cityId,
            county: areaData.county || areaData.countyId,
            town: areaData.town || areaData.townId
        };
        var proId = areaIdObj.province || "0",
            cityId = areaIdObj.city || "0",
            countyId = areaIdObj.county || "0",
            townId = areaIdObj.town || "0",
            area = '';
    }
    for (var i in first) {
        if (proId == i) {
            area += (first[i] + " ");
            break;
        }
    }
    var second = twoThird;
    for (var i in (second || {})) {
        if (cityId == i) {
            area += (second[i][0] + " ");
            break;
        }
    }
    var third = second[cityId] ? second[cityId][1] : {};
    for (var i in third) {
        if (countyId == i) {
            var thirdStr;
            if (typeof third[i] === "string") {
                thirdStr = third[i];
                area += thirdStr;
            } else {
                thirdStr = third[i][0];
                area += (thirdStr + " ");
            }
            break;
        }
    }
    if (!(typeof third[countyId] === 'string')) {
        var fourth = third[countyId] ? third[countyId][1] : {};
        for (var i in fourth) {
            if (townId == i) {
                area += fourth[i];
                break;
            }
        }
    }
    return area;
};

/**
 * 初始化地址控件
 * @param param.src 绑定触发事件的节点
 * @param param.firstLevel 一级地址json对象
 * @param param.addrJsonLevel 设定地址数据采用三级还是四级
 * @param param.callback 回调函数
 * @param param.areaData 回显地址area
 * @param param.otherLevel 回调函数
 */
qk.initAddressControl = function (param) {
    /*地址组件调用 start*/
    var addressObj = new Address({
        'type': 'click',                                    //设定触发事件类型
        'src': param.src,                                         //绑定触发事件的节点
        'isStop': true,
        'title': '所在地区',
        'provMap': param.firstLevel,                                 //传入一级地址, 不传的话默认自动请求接口获取
        'addrJsonLevel': param.addrJsonLevel,                     //设定地址数据采用三级还是四级
        'finishCB': param.callback,                                //地址选择完成后执行的回调函数
        'closeCB': param.closeBack                                //地址未选择执行的回调函数
    });
    /*地址组件调用 end*/

    if (param.areaData && param.otherLevel) {
        //回显地址
        var areaText = this.backAreaText(param.areaData, param.firstLevel, param.otherLevel);
        var jQueryObject = $(param.src); //取jQuery对象
        var domObject = jQueryObject[0]; //从jQuery对象中得到原生的DOM对象
        if (domObject.tagName.toUpperCase() == 'INPUT') {
            jQueryObject.val(areaText);
        } else {
            jQueryObject.html(areaText);
        }
        if (param.areaData && param.areaData.areaId && param.areaData.areaId.indexOf('-') > -1) {
            jQueryObject.attr("data-area", param.areaData.areaId);
        } else {
            jQueryObject.attr("data-area", param.areaData.provinceId + "-" + param.areaData.cityId + "-" + param.areaData.countyId + "-" + param.areaData.townId);
        }
    }
};

qk.page = {};
/**
 * 返回0：方法调用，参数有误；1：有下一页数据；2：只有一页数据，没有下一页了；3：有多页数据，没有下一页了;4：空页面
 * @param total
 * @param pageNum
 * @param pageSize
 * @returns {number}
 */
qk.page.loadBack = function (total, pageNum, pageSize) {
    var result = 0;
    if (!total || !pageNum || !pageSize) {
        qk.layer.msg(qk.errorMsg.error_return);
        return result;
    }
    var pageTatal = parseInt(total / pageSize) + (total % pageSize == 0 ? 0 : 1);
    if (pageTatal > pageNum) {
        result = 1;
    } else {
        if (total != 0) {
            if (pageNum <= 1) {
                result = 2;
            } else {
                result = 3;
            }
        } else {
            result = 4;
        }
    }
    return result;
};

qk.page.load = function (total, pageNum, pageSize) {
    if (!total || !pageNum || !pageSize) {
        qk.layer.msg(qk.errorMsg.error_return);
        return;
    }
    var pageTatal = parseInt(total / pageSize) + (total % pageSize == 0 ? 0 : 1);
    if (pageTatal > pageNum) {
        $('#pageLoadingMore').show();
        $('#pageNoMore').hide();
    } else {
        $('#pageLoadingMore').hide();
        if (total != 0) {
            if (pageNum <= 1) {
                $('#pageNoMore').css('visibility', 'hidden');
            } else {
                $('#pageNoMore').css('visibility', 'visible');
            }
            $('#pageNoMore').show();
        }
    }
};
qk.page.load1 = function (hasNext, pageNum) {
    if (!pageNum) {
        qk.layer.msg(qk.errorMsg.error_return);
        return;
    }
    if (hasNext) {
        $('#pageLoadingMore').show();
        $('#pageNoMore').hide();
    } else {
        $('#pageLoadingMore').hide();
        if (pageNum <= 1) {
            $('#pageNoMore').css('visibility', 'hidden');
        } else {
            $('#pageNoMore').css('visibility', 'visible');
        }
        $('#pageNoMore').show();
    }
};

qk.page.requestFailed = function () {
    var $error = $('#request-failed');
    if ($error.length > 0) {
        var errorInfo = $($error).data("errinfo");
        var errMsg = errorInfo.msg;
        if (errorInfo.errorCode == -1) {
            goLogin(errMsg ? errMsg : "请先登录");
        } else {
            qk.layer.msg(errMsg ? errMsg : "抱歉，出错了，请稍后再试");
        }
        $($error).remove();
        return false;
    }
    return true;
};
qk.page.loadAppendFailed = function (errorPageFlag) {
    var $error = errorPageFlag;
    if ($error.length > 0) {
        var errorInfo = $($error).data("errinfo");
        var errMsg = errorInfo.status ? errorInfo.status.errMsg : '';
        $($error).remove();
        return false;
    }
    return true;
}


qk.parseString2Json = function (sourceStr) {
    if (sourceStr && typeof sourceStr === "string") {
        try {
            return JSON.parse(sourceStr);
        } catch (err) {
            return sourceStr;
        }
    }
    return {};
};


function isLoginAjax(dom, callback) {
    $.ajax({
        url: baseRoutePrefix + "/user/userInfo",
        type: "post",
        data: {},
        dataType: "json",
        success: function (data) {
            if (data.errorCode == 0) {
                selectDirection(dom);
            }
            if (data.errorCode != 0) {
                //此处判定用户是否登录
                if (data.errorCode == -1) {
                    return goLogin(data.message);
                }
                //请求失败弹窗
                qk.dialog.alert(data.message);
                return;
            }
            if (data && data.isSuccess) {
                if (callback && typeof callback == 'function') {
                    callback();
                }
            }
        },
        error: function (data) {
            qk.dialog.alert({"html": "网络请求失败,请稍后再试！"});
        }
    });
}
// 登录
function goLogin(msg) {
    if (!msg) {
        return qk.passport.login();
    }
    qk.dialog.alert({
        html: msg,
        fnOk: function () {
            qk.passport.login();
        }
    });
}
function selectDirection(dom) {
    var dataMonitor = dom.getAttribute("data-monitor");
    switch (dataMonitor) {
        case "h5_goodsdetails_buy_cart" :
        case "h5_allproduct_shopcart_click" :
        case "h5_v1home_menu_shopcart" :
            window.location.href = "/shop_cart.html";
            break;
        case "h5_allproduct_order_click" :
        case "h5_home_menu_user" :
            window.location.href = "/usercenter.html";
            break;
        default:
            ;
    }
}

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
    },
    ajaxInfoNoLoading: function (param, port, successCB, errorCB, async, type) {
        if (async == undefined) {
            async = true;
        } else {
            async ? async = true : async = false;
        }

        if (type == undefined) {
            type = 'post';
        } else {
            type = type ? type : 'post';
        }
        $.ajax({
            type: type,
            url: port,
            dataType: "json",
            data: param,
            async: async,
            success: function (data) {
                successCB && successCB(data, port);
            },
            error: function (data) {
                errorCB && errorCB(data, port);
            }
        });
    },
    ajaxInfoContentJson: function (param, port, successCB, errorCB, async) {
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
            contentType: "application/json",
            data: JSON.stringify(param),
            dataType: "json",
            async: async,
            success: function (data) {
                successCB && successCB(data, port);
            },
            error: function (data) {
                errorCB && errorCB(data, port);
            }
        }).always(function () {
            qk.dialog.loading("hide");
        });
    },
    getJSON: function (param, port, thenCB, errorCB, alwaysCB) {
        qk.dialog.loading("show");
        $.getJSON(port, param).then(function (data) {
            thenCB && thenCB(data, port);
        }, function (data) {
            errorCB && errorCB(data, port);
        }).always(function (data) {
            qk.dialog.loading("hide");
            alwaysCB && alwaysCB(data, port);
        });
    },
    getJSONNoLoading: function (param, port, thenCB, errorCB, alwaysCB) {
        $.getJSON(port, param).then(function (data) {
            thenCB && thenCB(data, port);
        }, function (data) {
            errorCB && errorCB(data, port);
        }).always(function (data) {
            alwaysCB && alwaysCB(data, port);
        });
    },
    deepCopy: function (source) {
        var result = {};
        for (var key in source) {
            result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
        }
        return result;
    },
    qkDialogConfirm: function (message, callback) {
        qk.dialog.confirm({
            html: message,
            fnOk: function () {
                callback();
            }
        })
    }
};

var HistoryStock = {};
HistoryStock.option = (function () {
    var HistoryStockKey = "history_stock_key";
    var notPushStockUrl = [];
    var isNotPush = function (pathname) {
        for (var i = 0; i < notPushStockUrl.length; i++) {
            if (pathname === notPushStockUrl[i]) return true;
        }
        return false;
    }
    var isSupportSessionStorage = function() {
        if (window.sessionStorage) {
            return true;
        }
        return false;
    }
    //入栈
    var pushData = function(){
        var data = {};
        data.url = location.href;
        //data.time = (new Date()).getTime();
        if(!isSupportSessionStorage()){
            return;
        }
        //不能通过返回进入的页面，不进行入栈
        if(isNotPush(location.pathname)){
            return;
        }

        var stockData = sessionStorage.getItem(HistoryStockKey);
        if(!stockData){
            stockData = "[]";
        }
        var historyList = JSON.parse(stockData);
        //如果最后一条数据的url和要push的数据一样，则不进行push
        if(historyList.length > 0){
            if(sessionStorage.getItem("isReloadBackPage") == "1"){
                sessionStorage.removeItem("isReloadBackPage");
                historyList.pop();
                historyList.pop();
            }
            var lastData = historyList[historyList.length-1];
            if(data.url == lastData.url){
                historyList.pop();
            }
        }
        historyList.push(data);
        sessionStorage.setItem(HistoryStockKey, JSON.stringify(historyList));
    }
    //弹出栈
    var popData = function(){
        if(!isSupportSessionStorage()){
            return;
        }
        var stockData = sessionStorage.getItem(HistoryStockKey);
        if(!stockData){
            return;
        }
        var historyList = JSON.parse(stockData);
        if(historyList.length > 0){
            //返回最后一个元素并删除
            var data = historyList.pop();
            sessionStorage.setItem(HistoryStockKey, JSON.stringify(historyList));
            return data;
        }
        return;
    }
    //返回堆栈顶部数据
    var topData = function(){
        if(!isSupportSessionStorage()){
            return;
        }
        var stockData = sessionStorage.getItem(HistoryStockKey);
        if(!stockData){
            return;
        }
        var historyList = JSON.parse(stockData);
        if(historyList.length > 0){
            //返回最后一个元素
            var data = historyList[historyList.length-1];
            return data;
        }
        return;
    }
    var getBackUrl = function(){
        if(!isSupportSessionStorage()){
            return null;
        }
        var data = popData();
        if(data){
            if(location.href == data.url){
                return getBackUrl();
            }
            return data.url;
        }
        return null;
    }
    return {
        pushData: pushData,
        popData: popData,
        topData: topData,
        getBackUrl: getBackUrl
    }
})();

var _scrollTop = {

    /**
     * 添加 HTML 代码
     */
    init: function init() {
        this.bindScrollEvent();
    },
    /**
     * 事件绑定
     */
    bindScrollEvent: function() {
        var _this = this;
        $(window).scroll(function () {
            _this.checkScrollPosition();
        });
        $('#goTop').click(function () {
            var curScroll = $(window).scrollTop(); //获取当前scrollTop的位置
            var speed = 250; //上升的位移
            if (curScroll > 0) setInterval(timer, 1);
            function timer() {
                if (curScroll > 0) {
                    curScroll = curScroll - speed;
                    $(window).scrollTop(curScroll);
                    if (curScroll <= 0) {
                        $(window).scrollTop(0);
                        clearInterval(timer);
                    }
                }
            }
        });
    },

    /**
     * 判断滚动位置，确定是否显示
     */
    checkScrollPosition: function () {
        var _top = $(window).scrollTop(),
            _height = $(window).height();
        var _goTopDiv = $('#goTop');
        if(_top > _height){
            _goTopDiv.show();
        }else{
            _goTopDiv.hide();
        }
    }
};

uploadFileMaxSize = nodeParam.uploadFileMaxSize ? nodeParam.uploadFileMaxSize : 5;

// 初始化api请求前缀，不走nodejs的直接请求route的ajax请求需要添加此前缀(走nodejs的接口不添加前缀)
baseRoutePrefix = '/proxy'; //调用router服务接口(DDLink接口/userinfo接口使用)
baseRouteServicePrefix = '/proxy/b2c-brand-h5-service'; //ajax异步调用接口
baseRouteSeckillServicePrefix = '/proxy/b2c-brand-h5-service-seckill'; //ajax异步调用接