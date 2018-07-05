LocalStorageUtil = function() {
    var t = !1;
    try {
        window.localStorage.setItem("M_test", 1),
        window.localStorage.removeItem("M_test"),
        t = !0
    } catch (e) {
        t = !1,
        n.log("localStorage不支持", "error")
    }
    if (t) {
        try {
            window.localStorage.setItem("M_test", 1)
        } catch (e) {
            t = !1,
            n.log("localStorage无法set", "error")
        }
        try {
            window.localStorage.getItem("M_test")
        } catch (e) {
            t = !1,
            n.log("localStorage无法get", "error")
        }
        try {
            window.localStorage.removeItem("M_test")
        } catch (e) {
            t = !1,
            n.log("localStorage无法remove", "error")
        }
    }
    return {
        get: function(e) {
            var n = null;
            return t && e && (n = window.localStorage.getItem(e)),
            n
        },
        set: function(e, n) {
            if (t && e)
                try {
                    window.localStorage.setItem(e, n)
                } catch (t) {
                    LocalStorageUtil.removeAll(),
                    window.localStorage.setItem(e, n)
                }
        },
        remove: function(e) {
            t && e && window.localStorage.removeItem(e)
        },
        removeAll: function() {
            t && o.each(window.localStorage, function(t, e, n, r) {
                window.localStorage.removeItem(n)
            })
        }
    }
}

n.log = function(t, e) {
    !(n.config && n.config.debug && "undefined" != typeof console && null !== console && console[e || (e = "log")]) && console[e](t)
}