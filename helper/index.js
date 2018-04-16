'use strict';

const message = (err, result, message) => {
    const msg = {
        error_code: 0,
        message: 'SUCCESS'
    }
    if (err) {
        msg.error_code = -1;
        if (message) {
            msg.message = message;
        } else {
            msg.message = err;
        }
        return msg;
    }
    if (result instanceof Object && result) {
        for (let key in result) {
            msg[key] = result[key];
        }
        return msg;
    }
    return msg;
};

const simpleDateFormat = (time, format) => {
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
};

exports.message = message;
exports.simpleDateFormat = simpleDateFormat;
