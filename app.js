"use strict";
let express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    config = require(__dirname + '/config/config_min.json'),
    app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
let session = require('express-session');

app.use(session({"secret": "it:demo:secret",
    resave: true,
    "key": "sid",
    saveUninitialized: true,
    "cookie": {
        "path": "/",
        "httpOnly": true,
        "maxAge": null
}}))

global.DIR_ROOT = __dirname;
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/project', require('./routes/project'));
//app.use('/user', require('./routes/user'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'dev') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if( 404 === err.status){
        res.send(err);
    } else {
        res.render('error', {
            message: err.message,
            error: err
        });
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});


module.exports = app;
