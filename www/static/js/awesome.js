/**
 * Created by Ethan on 2017-06-26.
 */

if (!window.console) {
    window.console = {
        log: function () {},
        info: function () {},
        error: function () {},
        warn: function () {},
        debug: function () {}
    };
}

if (! String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

if (! Number.prototype.toDataTime) {
    var replaces = {
        'yyyy': function (dt) {
            return dt.getFullYear().toString();
        },
        'yy': function (dt) {
            return (dt.getFullYear() % 100).toString();
        },
        'MM': function (dt) {
            var m = dt.getMonth() + 1;
            return m < 10 ? '0' + m : m.toString();
        },
        'M': function (dt) {
            var m = dt.getMonth() + 1;
            return m.toString();
        },
        'dd': function (dt) {
            var d = dt.getDay();
            return d < 10 ? '0' + d : d.toString();
        },
        'd': function (dt) {
            var d = dt.getDay();
            return d.toString();
        },
        'hh': function (dt) {
            var h = dt.getHours();
            return h < 10 ? '0' + h : h.toString();
        },
        'h': function (dt) {
            var h = dt.getHours();
            return h.toString();
        },
        'mm': function (dt) {
            var m = dt.getMinutes();
            return m < 10 ? '0' + m : m.toString();
        },
        'm': function (dt) {
            return m.toString();
        },
        'ss': function (dt) {
            var s = dt.getSeconds();
            return s < 10 ? '0' + s : s.toString();
        },
        'a': function (dt) {
            var h = dt.getHours();
            return h < 12 ? 'AM' : 'PM';
        }
    };

    var token = /([a-zA-Z]+)/;
    Number.prototype.toDataTime = function (format) {
        var fmt = format || 'yyyy-MM-dd hh:mm:ss';
        var dt = new Date(this * 1000);
        var arr = fmt.split(token);
        for (var i=0; i<arr.length; i++) {
            var s = arr[i];
            if (s && s in replaces) {
                arr[i] = replaces[s](dt);
            }
        }
        return arr.join('');
    };
}