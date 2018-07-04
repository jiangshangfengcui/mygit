s = {
        getCookie: function(t) {
            var e, n = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
            return (e = document.cookie.match(n)) ? unescape(e[2]) : null
        },
        setCookie: function(t, e, n, r, i) {
            var o = t + "=" + escape(e);
            if ("" != n) {
                var a = new Date;
                a.setTime(a.getTime() + 24 * n * 3600 * 1e3),
                o += ";expires=" + a.toGMTString()
            }
            "" != r && (o += ";path=" + r),
            "" != i && (o += ";domain=" + i),
            document.cookie = o
        },
        delCookie: function(t) {
            var e = new Date;
            e.setTime(e.getTime() - 1),
            document.cookie = t + "=; expires=" + e.toGMTString()
        }
    }