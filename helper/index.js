'use strict';

const message = (err, result, message) => {
    const msg = {
        error_code: 0,
        message: 'successful'
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

exports.message = message;
