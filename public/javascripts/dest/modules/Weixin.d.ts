/**
 * 与微信api交互
 */
import Ajax = require("Ajax");
import Tool = require("Tool");
import IRootScope = require("IRootScope");
declare class Weixin {
    private $rootScope;
    private AjaxService;
    private ToolService;
    private wx;
    constructor($rootScope: IRootScope.rootScope, AjaxService: Ajax, ToolService: Tool, wx: WX.IWXObject);
    /**
     * 初始化微信对象
     */
    wxConfig(): void;
    /**
     * 配置wx对象的回调
     */
    wxInit(): void;
    /**
     * 自定义分享内容,使用元素最多的类型(IShareFriendObject)
     * 1.title:分享标题,
     * 2.desc:分享描述,
     * 3.link:分享链接,
     * 4.imgUrl:分享图标,
     * 5.type：分享类型,默认为link,
     * 6.dataUrl：分享数据的连接
     */
    wxShare(obj: WX.IShareFriendObject): void;
    /**
     * 获取支付参数，成功后发起支付请求
     */
    wxPay(orderId: number, code: number): void;
}
export = Weixin;
