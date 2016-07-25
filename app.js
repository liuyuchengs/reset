// 加载中间件
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");
//加载路由
var loginRoute = require("./build/routes/loginRoute");
var focueRoute = require("./build/routes/focusRoute");
var mycountRoute = require('./build/routes/mycountRoute');
var bannerRoute = require("./build/routes/bannerRoute");
var productRoute = require("./build/routes/productRoute");
var imageRoute = require("./build/routes/imageRoute");
var hospitalRoute = require("./build/routes/hospitalRoute");

var app = express();
// 日志输出流
var loggerStream = fs.createWriteStream("logger/log.txt",{defaultEncoding: 'utf8',flags: 'w'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 配置中间件
app.use(logger('tiny',{stream:loggerStream}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(__dirname+"/public/contents/img/logo.png"));

// 配置路由
app.use("/wx/login",loginRoute);
app.use("/wx/focus",focueRoute);
app.use("/wx/mycount",mycountRoute);
app.use("/wx/banner",bannerRoute);
app.use("/wx/product",productRoute);
app.use("/wx/image",imageRoute);
app.use("/wx/hospital",hospitalRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;