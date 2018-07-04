BrowserUtil = function() {
        var t = null
          , e = null;
        function n() {
            var n = navigator.userAgent;
            t = {},
            e = {};
            var r = n.match(/Web[kK]it[\/]{0,1}([\d.]+)/)
              , i = n.match(/(Android);?[\s\/]+([\d.]+)?/)
              , o = !!n.match(/\(Macintosh\; Intel /)
              , a = n.match(/(iPad).*OS\s([\d_]+)/)
              , s = n.match(/(iPod)(.*OS\s([\d_]+))?/)
              , u = !a && n.match(/(iPhone\sOS)\s([\d_]+)/)
          , c = n.match(/(webOS|hpwOS)[\s\/]([\d.]+)/)
          , l = c && n.match(/TouchPad/)
          , f = n.match(/Kindle\/([\d.]+)/)
          , h = n.match(/Silk\/([\d._]+)/)
          , d = n.match(/(BlackBerry).*Version\/([\d.]+)/)
          , p = n.match(/(BB10).*Version\/([\d.]+)/)
          , y = n.match(/(RIM\sTablet\sOS)\s([\d.]+)/)
          , m = n.match(/PlayBook/)
          , g = n.match(/Chrome\/([\d.]+)/) || n.match(/CriOS\/([\d.]+)/)
          , v = n.match(/Firefox\/([\d.]+)/)
          , w = n.match(/MSIE\s([\d.]+)/) || n.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/)
          , b = !g && n.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/)
          , x = b || n.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)
          , S = n.indexOf("MicroMessenger") >= 0;
        r && (e.browser = "webkit",
        e.version = r[1]),
        i && (t.os = "android",
        t.version = i[2]),
        u && !s && (t.os = "ios",
        t.cline = "iphone"),
        a && (t.os = "ios",
        t.cline = "ipad"),
        s && (t.os = "ios",
        t.cline = "ipod",
        t.version = s[3] ? s[3].replace(/_/g, ".") : null),
        c && (t.os = "webos",
        t.version = c[2]),
        l && (t.os = "touchpad"),
        d && (t.os = "blackberry",
        t.version = d[2]),
        p && (t.os = "bb10",
        t.version = p[2]),
        y && (t.os = "rimtabletos",
        t.version = y[2]),
        m && (t.os = "playbook"),
        f && (t.kindle = "kindle",
        t.version = f[1]),
        h && (t.silk = "silk",
        t.version = h[1]),
        !h && t.android && n.match(/Kindle Fire/) && (e.browser = "silk"),
        g && (e.browser = "chrome",
        e.version = g[1]),
        v && (e.browser = "firefox",
        e.version = v[1]),
        w && (e.browser = "ie",
        e.version = w[1]),
        x && (o || t.ios) && (e.browser = "safari",
        o && (e.version = x[1])),
        b && (e.browser = "webview"),
        S && (e.browser = "weixin"),
        t.tablet = !!(a || m || i && !n.match(/Mobile/) || v && n.match(/Tablet/) || w && !n.match(/Phone/) && n.match(/Touch/)),
        t.phone = !(t.tablet || t.ipod || !(i || u || c || d || p || g && n.match(/Android/) || g && n.match(/CriOS\/([\d.]+)/) || v && n.match(/Mobile/) || w && n.match(/Touch/))),
        t.os = t.os || null,
        t.version = t.version || null,
        t.cline = t.cline || null,
        t.kindle = t.kindle || !1,
        t.tablet = t.tablet || null,
        t.phone = t.phone || !1,
        t.silk = t.silk || null,
        e.browser = e.browser || null,
        e.version = e.version || null
    }
    return {
        getOs: function() {
            return t && e || n(),
            t
        },
        getBrowser: function() {
            return t && e || n(),
            e
        }
    }
}