const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const engines = require('consolidate');
const routes = require('./routes');

const app = express();

// view engine setup  
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// 当前使用的是html不是jade模版，所以无法直接使用
app.set('views', path.join(__dirname, 'views')); //__dirname + '/views'
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('[:date[clf]] [:status] :method :url ~:response-time(ms) -:res[content-length]- @:remote-addr #:user-agent'));
app.use(bodyParser.json());
app.use(session({
    resave:true,
    secret:'liuwei',
    saveUninitialized:true,
	cookie: {maxAge: 1000 * 60 * 60 * 4}
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers development error handler will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		console.log(err);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
// 	console.log(err);
// 	res.render('error', {
// 		message: err.message,
// 		error: {}
// 	});
// });

module.exports = app;