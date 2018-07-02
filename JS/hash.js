u = {
    getParam: function(t) {
        var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)","i")
          , n = window.location.search.substr(1).match(e);
        return null != n ? decodeURI(n[2]) : null
    },
    setParams: function(t) {
        var e = window.location.search
          , n = ""
          , r = new Array
          , a = {};
        if (!o.isObject(t))
            throw new Error("arguments is not a jsonobject");
        if (-1 != e.indexOf("?") && (n = e.substr(e.indexOf("?") + 1)),
        n.length > 0) {
            var s = n.split("&");
            for (i in s) {
                var u = s[i].split("=");
                u.length > 1 ? a[u[0]] = u[1] : a[u[0]] = ""
            }
            o.merge(a, t)
        } else
            a = t;
        for (key in a)
            r.push(key),
            r.push("="),
            r.push(t[key]),
            r.push("&");
        r.pop(),
        window.location.search = r.jion()
    },
    getHash: function() {
        var t = window.location.hash;
        return t ? t.replace("#", "") : void 0
    },
    setHash: function(t) {
        window.location.hash = t ? "#" + t : ""
    }
}