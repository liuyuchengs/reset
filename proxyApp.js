/**
 * 做中转路由的app配置
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//加载路由
var proxyRoute = require("./build/routes/proxyRoute");
var proxyUserRoute = require("./build/routes/proxyUserRoute");
var app = express();

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
app.use(favicon(__dirname+"/public/contents/img/logo.png"));

//配置中转路由->普通文本
app.use("/wx/product/queryrecommend",proxyRoute);
app.use("/wx/banner/query",proxyRoute);
app.use("/weixin/check/getjsconfig",proxyRoute);
app.use("/wx/login/wxlogin",proxyRoute);
app.use("/wx/focus/focusManCount",proxyRoute);
app.use("/wx/order/queryOrderList",proxyRoute);
app.use("/wx/order/orderCacel",proxyRoute);
app.use("/wx/order/findAllVouchers",proxyRoute);
app.use("/wx/order/activate",proxyRoute);
app.use("/wx/order/overdue",proxyRoute);
app.use("/wx/order/queryUserGiftCode",proxyRoute);
app.use("/wx/findpass/findPassPhontCheck",proxyRoute);
app.use("/wx/findpass/sendsmsfindpasscode",proxyRoute);
app.use("/wx/findpass/changepwd",proxyRoute);
app.use("/wx/register/registercheck",proxyRoute);
app.use("/wx/register/sendsmsregistercode",proxyRoute);
app.use("/wx/register/register",proxyRoute);
app.use("/wx/health/queryByType",proxyRoute);
app.use("/wx/health/querydetail",proxyRoute);
app.use("/wx/order/queryByGift",proxyRoute);
app.use("/wx/order/queryGift",proxyRoute);
app.use("/wx/gift/querydate",proxyRoute);
app.use("/wx/gift/queryproduct",proxyRoute);
app.use("/wx/order/checkCode",proxyRoute);
app.use("/wx/gift/getgiftproduct",proxyRoute);
app.use("/wx/product/querylist",proxyRoute);
app.use("/wx/image/querybymainid",proxyRoute);
app.use("/wx/hospital/querybyid",proxyRoute);
app.use("/wx/doctor/queryscheduledoctorbyproductid",proxyRoute);
app.use("/wx/schedule/querybydoctorid",proxyRoute);
app.use("/wx/order/checkCodeMoney",proxyRoute);
app.use("/wx/post/focus",proxyRoute);
app.use("/wx/post/cacelFocus",proxyRoute);
app.use("/wx/product/querybyid",proxyRoute);
app.use("/wx/doctor/querydoctorbycityandprofession",proxyRoute);
app.use("/wx/doctor/queryDoctorDetailInfo",proxyRoute);
app.use("/wx/order/querybydoctorid",proxyRoute);
app.use("/wx/post/focus",proxyRoute);
app.use("/wx/post/cacelFocus",proxyRoute);
app.use("/wx/review/showdoctorreview",proxyRoute);
app.use("/wx/post/postList",proxyRoute);
app.use("/wx/post/postDetail",proxyRoute);
app.use("/wx/post/postMessage",proxyRoute);
app.use("/wx/post/thumbUp",proxyRoute);
app.use("/wx/repliesMessage/addRepliesMessage",proxyRoute);
app.use("/wx/post/myPost",proxyRoute);
app.use("/wx/repliesMessage/myReply",proxyRoute);
app.use("/wx/repliesMessage/myMessage",proxyRoute);
app.use("/wx/post/doctorMessage",proxyRoute);
app.use("/wx/focus/focusUserMan",proxyRoute);
app.use("/wx/focus/focusDoctorMan",proxyRoute);
app.use("/wx/focus/focusProductMan",proxyRoute);
app.use("/wx/product/packagedetal",proxyRoute);
app.use("/wx/product/hospitalbyid",proxyRoute);
app.use("/wx/product/packagedetalItem",proxyRoute);
app.use("/wx/schedule/querybyhospitalid",proxyRoute);
app.use("/wx/hospital/querylist",proxyRoute);
app.use("/wx/product/queryActivity",proxyRoute);
app.use("/wx/post/addPost",proxyRoute);
app.use("/wx/user/createReferralCode",proxyRoute);
app.use("/wx/share/queryById",proxyRoute);
app.use("/wx/withDraw/bound",proxyRoute);
app.use("/wx/withDraw/myBound",proxyRoute);
app.use("/wx/post/deletePost",proxyRoute);
app.use("/wx/repliesMessage/deleteReplies",proxyRoute);
app.use("/wx/mycount/getUserByToken",proxyRoute);
app.use("/wx/withdraw/myMoney",proxyRoute);
app.use("/wx/withDraw/apply",proxyRoute);
//配置中转路由->图片上传
app.use("/wx/mycount/updateUserInfo",proxyUserRoute);


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