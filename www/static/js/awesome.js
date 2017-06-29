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

function enCodeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function parseQueryString() {
    var
        q = location.search,
        r = {},
        i, pos, s, qs;
    if (q && q.charAt(0)==='?') {
        qs = q.substring(1).split('&');
        for (i=0; i<qs.length; i++) {
            s = qs[i];
            pos = s.indexOf('=');
            if (pos <= 0) {
                continue;
            }
            r[s.substring(0, pos)] = decodeURIComponent(s.substring(pos+1)).replace(/\+/g, ' ');
        }
    }
    return r;
}

function gotoPage(i) {
    var r = parseQueryString();
    r.page = i;
    location.assign('?' + $.param(r));
}

function refresh() {
    var
        t = new Date().getTime(),
        url = location.pathname;
    if (location.search) {
        url = url + location.search + '&t=' + t;
    }
    else {
        url = url + '?t=' + t;
    }
    location.assign(url);
}

function toSmartDate(timestamp) {
    if (typeof(timestamp) === 'string') {
        timestamp = parseInt(timestamp);
    }
    if (isNaN(timestamp)) {
        return '';
    }

    var
        today = new Date(g_time),
        now = today.getTime(),
        s = '1 minute ago',
        t = now - timestamp;
    if (t > 604800000) {
        var that = new Date(timestamp);
        var
            y = that.getFullYear(),
            m = that.getMonth() + 1,
            d = that.getDate(),
            hh = that.getHours(),
            mm = that.getMinutes();
        s = y===today.getFullYear() ? '' : y + ' year ';
        s = s + m + ' months ' + d + ' days ' + hh + ':' + (mm < 10 ? '0' : '') + mm;
    }
    else if (t >= 86400000) {
        // 1 - 6 days ago
        s = Math.floor(t / 86400000) + ' days ago.';
    }
    else if (t >= 3600000) {
        // 1 - 23 hours ago
        s = Math.floor(t / 3600000) + ' hours ago.';
    }
    else if ( t >= 60000) {
        s = Math.floor(t / 60000) + ' minutes ago.';
    }
    return s;
}

$(function () {
    $('.x-smartdate').each(function () {
        $(this).removeClass('x-smartdate').text(toSmartDate($(this).attr('date')));
    });
});

// JS Template

function Template(tpl) {
    var
        fn,
        match,
        code = ['var r=[];\nvar _html = function (str) { return str.replace(/&/g, \'&amp;\').replace(/"/g, \'&quot;\')' +
        '/\'/g, \'&#39;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\'); };'],
        re = /{\s*([a-zA-Z._0-9()]+)(\s*|\s*\s*safe)?\s*}/m,
        addLine = function (text) {
            code.push('r.push(\'' + text.replace(/'/g, '\\\'').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '\');');
        };
    while (match = re.exec(tpl)) {
        if (match.index > 0) {
            addLine(tpl.slice(0, match.index));
        }
        if (match[2]) {
            code.push('r.push(String(this.' + match[1] + '));');
        }
        else {
            code.push('r.push(_html(String(this.' + match[1] + ')));');
        }
        tpl = tpl.substring(match.index + match[0].length);
    }
    addLine(tpl);
    code.push('return r.join(\'\');');
    fn = new Function(code.join('\n'));
    this.render = function (model) {
        return fn.apply(model);
    };
}