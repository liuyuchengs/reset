const express = require("express");
const router = express();
const multer = require("multer");
var Ajax = require("./../module/js/Ajax"); //http请求

//配置上传对象
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        let list = file.originalname.split(".");
        cb(null,Date.now()+"."+list[1]);
    }
})

const upload = multer({storage:storage});

// home页面

router.post("/wx/product/queryrecommend",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/banner/query",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/weixin/check/getjsconfig",function *(){
    this.body = yield Ajax.post(this.request);
})

// 登录页面
router.post("/wx/login/wxlogin",function *(){
    this.body = yield Ajax.post(this.request);
})

// 用户页面
router.post("/wx/focus/focusManCount",function *(){
    this.body = yield Ajax.post(this.request);
})

// 修改用户信息
router.post("/wx/mycount/updateUserInfo",function *(){
    this.body = yield Ajax.post(this.request);
})

//我的订单页面
router.post("/wx/order/queryOrderList",function (req,res){
    var body = req.body;
    var query = req.query;
    res.send("");
})
router.post("/wx/order/orderCacel",function *(){
    this.body = yield Ajax.post(this.request);
})

//代金券页面
router.post("/wx/order/findAllVouchers",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/order/activate",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/order/overdue",function *(){
    this.body = yield Ajax.post(this.request);
})

//惠赠订单
router.get("/wx/order/queryUserGiftCode",function *(){
    this.body = yield Ajax.post(this.request);
})

//找回密码
router.post("/wx/findpass/findPassPhontCheck",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/findpass/sendsmsfindpasscode",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/findpass/changepwd",function *(){
    this.body = yield Ajax.post(this.request);
})

//注册
router.post("/wx/register/registercheck",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/register/sendsmsregistercode",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/register/register",function *(){
    this.body = yield Ajax.post(this.request);
})

//资讯页面
router.post("/wx/health/queryByType",function *(){
    this.body = yield Ajax.post(this.request);
})

router.post("/wx/health/querydetail",function *(){
    this.body = yield Ajax.post(this.request);
})

//特惠页面
router.post("/wx/order/queryByGift",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/order/queryGift",function *(){
    this.body = yield Ajax.post(this.request);
})

//免费抢单
router.get("/wx/gift/querydate",function *(){
    this.body = yield Ajax.get(this.request);
})
router.post("/wx/gift/queryproduct",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/order/checkCode",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/gift/getgiftproduct",function *(){
    this.body = yield Ajax.post(this.request);
})

//体检
router.post("/wx/gift/getgiftproduct",function *(){
    this.body = yield Ajax.post(this.request);
})

//项目列表
router.post("/wx/product/querylist",function *(){
    this.body = yield Ajax.post(this.request);
})

//项目详情
router.post("/wx/image/querybymainid",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/hospital/querybyid",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/image/querybymainid",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/doctor/queryscheduledoctorbyproductid",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/schedule/querybydoctorid",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/order/checkCodeMoney",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/focus",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/cacelFocus",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/product/querybyid",function *(){
    this.body = yield Ajax.post(this.request);
})

//订单详情
router.post("/wx/order/make",function *(){
    this.body = yield Ajax.post(this.request);
})

//医生列表
router.post("/wx/doctor/querydoctorbycityandprofession",function *(){
    this.body = yield Ajax.post(this.request);
})

//医生详情
router.post("/wx/doctor/queryDoctorDetailInfo",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/order/querybydoctorid",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/focus",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/cacelFocus",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/review/showdoctorreview",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/postList",function *(){
    this.body = yield Ajax.post(this.request);
})

//帖子详情页面
router.post("/wx/post/postDetail",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/postMessage",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/thumbUp",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/repliesMessage/addRepliesMessage",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/repliesMessage/addRepliesMessage",function *(){
    this.body = yield Ajax.post(this.request);
})

//我的帖子
router.post("/wx/post/myPost",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/repliesMessage/myReply",function *(){
    this.body = yield Ajax.post(this.request);
})

//我的消息
router.post("/wx/repliesMessage/myMessage",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/doctorMessage",function *(){
    this.body = yield Ajax.post(this.request);
})

//关注页面
router.post("/wx/focus/focusUserMan",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/focus/focusDoctorMan",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/focus/focusProductMan",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/focus",function *(){
    this.body = yield Ajax.post(this.request);
})


//体检详情
router.post("/wx/product/packagedetal",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/product/hospitalbyid",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/product/packagedetalItem",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/schedule/querybyhospitalid",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/hospital/querylist",function *(){
    this.body = yield Ajax.post(this.request);
})

//活动页
router.post("/wx/product/queryActivity",function *(){
    this.body = yield Ajax.post(this.request);
})

router.post("/wx/post/addPost",upload.single("img"),function (req,res){
    res.send("success");
})

router.post("/wx/user/createReferralCode",function *(){
    this.body = yield Ajax.post(this.request);
})

router.post("/wx/share/queryById",function *(){
    this.body = yield Ajax.post(this.request);
})

router.post("/wx/withDraw/myBound",function *(){
    this.body = yield Ajax.post(this.request);
})

router.post("/wx/withDraw/bound",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/deletePost",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/repliesMessage/deleteReplies",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/mycount/getUserByToken",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/withdraw/myMoney",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/withDraw/apply",function *(){
    this.body = yield Ajax.post(this.request);
})

module.exports = router;
