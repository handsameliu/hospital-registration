export default {
    setCookie: function (name, value, expireTime) {
        if (!expireTime) {
            expireTime = 30
        }
        var time = new Date()
        time.setMinutes(time.getMinutes() + expireTime)
        document.cookie = name + '=' + escape(value) + ';path=/;expires =' + time.toGMTString()
    },
    getCookie: function (name) {
        var arr = document.cookie.split(';')
        var paramObj = {}
        if (name === 'token') {
            for (var key = 0; key < arr.length; key++) {
                var index = arr[key].indexOf('=')
                var param = [arr[key].substr(0, index), arr[key].substring(index + 2, arr[key].length - 1)]
                if (param[0] && param[1]) {
                    paramObj[param[0].replace(/^\s+/, '')] = param[1].replace(
                            /^\s+/, '')
                }
            }
        } else {
            for (var key2 = 0; key2 < arr.length; key2++) {
                var param2 = arr[key2].split('=')
                if (param2[0] && param2[1]) {
                    paramObj[param2[0].replace(/^\s+/, '')] = param2[1].replace(/^\s+/, '')
                }
            }
        }
        if (name) {
            return unescape(paramObj[name]) || ''
        }
        return paramObj
    },
    removeCookie: function (name) {
        this.setCookie(name, 1, -1)
    },
    /**
     * 自定义时间 time 时间 format 想要的格式
     */
    simpleDateFormat: function (time, format) {
        var t = new Date(time)
        var tf = function (i) {
            return (i < 10 ? '0' : '') + i
        }
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
            switch (a) {
            case 'yyyy':
                return tf(t.getFullYear())
            case 'MM':
                return tf(t.getMonth() + 1)
            case 'mm':
                return tf(t.getMinutes())
            case 'dd':
                return tf(t.getDate())
            case 'HH':
                return tf(t.getHours())
            case 'ss':
                return tf(t.getSeconds())
            }
        })
    },
    /**
     * 当前时间 時分秒
     */
    audioSet: function () {
        var mydate = new Date()
        var h = mydate.getHours() > 9 ? mydate.getHours() : '0' + mydate.getHours()
        var m = mydate.getMinutes() > 9 ? mydate.getMinutes() : '0' + mydate.getMinutes()
        var s = mydate.getSeconds() > 9 ? mydate.getSeconds() : '0' + mydate.getSeconds()
        return h + ':' + m + ':' + s
    },
    /**
     * 获取对象长度
     *
     * @param object
     * @returns
     */
    getObjLength: function (object) {
        var count = 0
        for (var i in object) {
            if (object.hasOwnProperty(i)) {
                count++
            }
        }
        return count
    },
    /**
     * 获取url中‘？’后的参数
     *
     * @param key
     * @returns
     */
    getRequestParam: function (item) {
        var url = location.search.replace(/^\?/, '').split('&')
        var paramsObj = {}
        for (var key = 0; key < url.length; key++) {
            var param = url[key].split('=')
            paramsObj[param[0]] = unescape(decodeURI(param[1]))
        }
        if (item) {
            return paramsObj[item] || ''
        }
        return paramsObj
    },
    /**
     * 删除url中的参数
     *
     * @param name
     * @returns 删除后的url
     */
    delURLQuery: function (name) {
        var loca = window.location
        var baseUrl = loca.origin + loca.pathname + '?'
        var query = loca.search.substr(1)
        if (query.indexOf(name) > -1) {
            var obj = {}
            var arr = query.split('&')
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split('=')
                obj[arr[i][0]] = arr[i][1]
            }
            delete obj[name]
            var url = baseUrl + JSON.stringify(obj).replace(/['"{}]/g, '').replace(/:/g, '=').replace(/,/g, '&')
            return url
        }
    },
    /*
    * url 随机数
    */
    next: function (url) {
        let _ = new Date().getTime()
        url += url.indexOf('?') >= 0 ? '&_=' + _ : '?_=' + _
        // if(url.indexOf('?')){
        //     url += '&_='+_;
        // }else{
        //     url += '?_='+_;
        // }
        window.location.href = url
    },
    mul: function (n1, n2) {
        var r1 = 0
        var r2 = 0
        n1 = '' + n1
        n2 = '' + n2
        if (~n1.indexOf('.')) { r1 = n1.split('.')[1].length }
        if (~n2.indexOf('.')) { r2 = n2.split('.')[1].length }
        n1 = n1.replace('.', '') * 1
        n2 = n2.replace('.', '') * 1
        return (n1 * n2) / Math.pow(10, r1 + r2)
    },
    /**
     * 判断是否对象
     * @param {*} object
     */
    isObj (object) {
        return object && typeof (object) === 'object' && Object.prototype.toString.call(object).toLowerCase() === '[object object]'
    },
    /**
     * 判断是否数组
     * @param {*} object
     */
    isArray (object) {
        return object && typeof (object) === 'object' && object.constructor === Array
    },
    /**
     * 深拷贝
     * @param {*} source
     */
    deepCopy (o) {
        if (!o || (typeof o) !== 'object') return o
        let dc = Array.isArray(o) ? [] : {}
        let keys = Object.keys(o)
        parentObjects.push(o)
        for (let k of keys) {
            let v = o[k]
            if (parentObjects.indexOf(v) > -1) {
                throw Error('检测到属性循环引用')
            }
            dc[k] = this.deepCopy(v)
        }
        parentObjects.pop()
        return dc
    },
    /**
     * 计算百分比
     * @param num
     * @param total
     * @returns {*}
     * @constructor
     */
    getPercent (num, total) {
        num = parseFloat(num)
        total = parseFloat(total)
        if (isNaN(num) || isNaN(total)) {
            return '-'
        }
        return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00 + '%')
    },
    /**
     * 获取数组下标
     * @param value
     * @param arr
     * @returns {number}
     */
    getArrIndex: function (value, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                return i
            }
        }
    }
}
let parentObjects = []
