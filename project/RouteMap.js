'use strict';

module.exports = function (app) {

    var loginRequired = require('./middleware/LoginRequired');

    var indexRouter = require('./routes/indexRouter');
    app.use('/', indexRouter);


};
