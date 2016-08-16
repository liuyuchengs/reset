"use strict";
class Weixin {
    constructor($rootScope, AjaxService, ToolService, wx) {
        this.$rootScope = $rootScope;
        this.AjaxService = AjaxService;
        this.ToolService = ToolService;
        this.wx = wx;
    }
    /**
     * 初始化微信对象
     */
    wxConfig() {
        let params = {
            debug: false,
            appid: null,
            timestamp: null,
            nonceStr: null,
            signature: null,
            jsApiList: ['getLocation', 'chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo'],
        };
        this.AjaxService.post({
            url: this.ToolService.host + "/weixin/check/getjsconfig",
            data: [["url", encodeURIComponent(location.href)]],
        }).then((data) => {
            params.appid = data.appid;
            params.timestamp = data.timestamp;
            params.nonceStr = data.nonceStr;
            params.signature = data.signature;
            this.wx.config(params);
        });
    }
    /**
     * 配置wx对象的回调
     */
    wxInit() {
        /**
         * wx对象配置完成后调用此函数
         */
        this.wx.ready(() => {
            /**
             * 检查客户端api支持情况
             */
            this.wx.checkJsApi({
                jsApiList: ['getLocation', 'chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo'],
                success: (res) => {
                    if (!res.checkResult.getLocation || !res.checkResult.chooseWXPay) {
                        this.ToolService.alert("客户端版本过低，请升级微信客户端");
                    }
                }
            });
            /**
             * 获取地理位置
             * 1.获取结果以sessionStorage的loationinfo为准
             * 2.has:true->获取成功，has:false->获取失败
             */
            this.wx.getLocation({
                type: "wgs84",
                success: (res) => {
                    let locationInfo = {
                        latitude: res.latitude,
                        longitude: res.longitude,
                        has: true,
                    };
                    this.ToolService.setSession("locationInfo", locationInfo);
                },
                fail: () => {
                    var locationInfo = {
                        latitude: 0,
                        longitude: 0,
                        has: false,
                    };
                    this.ToolService.setSession("locationInfo", locationInfo);
                }
            });
        });
        /**
         * wx对象配置失败后调用此函数
         */
        this.wx.error((res) => {
            this.ToolService.alert("wx初始化失败!");
        });
    }
    /**
     * 自定义分享内容,使用元素最多的类型(IShareFriendObject)
     * 1.title:分享标题,
     * 2.desc:分享描述,
     * 3.link:分享链接,
     * 4.imgUrl:分享图标,
     * 5.type：分享类型,默认为link,
     * 6.dataUrl：分享数据的连接
     */
    wxShare(obj) {
        this.wx.onMenuShareTimeline({
            title: obj.title,
            link: obj.link,
            imgUrl: obj.imgUrl,
            success: obj.success,
            cancel: obj.cancel,
        });
        this.wx.onMenuShareAppMessage({
            title: obj.title,
            desc: obj.desc,
            link: obj.link,
            imgUrl: obj.imgUrl,
            type: obj.type,
            dataUrl: obj.dataUrl,
            success: obj.success,
            cancel: obj.cancel
        });
        this.wx.onMenuShareQQ({
            title: obj.title,
            desc: obj.desc,
            link: obj.link,
            imgUrl: obj.imgUrl,
            success: obj.success,
            cancel: obj.cancel
        });
        this.wx.onMenuShareQZone({
            title: obj.title,
            desc: obj.desc,
            link: obj.link,
            imgUrl: obj.imgUrl,
            success: obj.success,
            cancel: obj.cancel,
        });
        this.wx.onMenuShareWeibo({
            title: obj.title,
            desc: obj.desc,
            link: obj.link,
            imgUrl: obj.imgUrl,
            success: obj.success,
            cancel: obj.cancel,
        });
    }
    /**
     * 获取支付参数，成功后发起支付请求
     */
    wxPay(orderId, code) {
        let params = {
            timestamp: null,
            nonceStr: null,
            package: null,
            signType: null,
            paySign: null,
            success: () => {
                window.location.href = "https://www.uokang.com/v2/htmls/index.html#/pay/result?payResult=success";
            },
            cancel: () => {
                window.location.href = "https://www.uokang.com/v2/htmls/index.html#/pay/result?payResult=fail";
            },
            fail: () => {
                window.location.href = "https://www.uokang.com/v2/htmls/index.html#/pay/result?payResult=fail";
            }
        };
        if (this.ToolService.empty(orderId) && this.ToolService.empty(code)) {
            this.ToolService.alert("请求参数不完整!");
        }
        else {
            this.AjaxService.post({
                url: this.ToolService.host + "/wx/order/weixin",
                data: [["payType", "JSAPI"], ["orderId", orderId], ["code", code]],
                headers: {
                    accessToken: this.ToolService.getLocal("user").accessToken,
                }
            }).then((data) => {
                params.timestamp = data.data.timestamp;
                params.nonceStr = data.data.nonceStr;
                params.package = data.data.package;
                params.signType = "MD5";
                params.paySign = data.data.sign;
                if (this.ToolService.emptyany(params)) {
                    this.ToolService.alert("请求支付参数失败，请稍后再试!");
                }
                else {
                    this.wx.chooseWXPay(params);
                }
            });
        }
    }
}
module.exports = Weixin;
//# sourceMappingURL=Weixin.js.map