'use strict';

const api = require('./api_router');

module.exports = function (app) {
    // app.use('/', page);
    app.use('/api', api);
}
