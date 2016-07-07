
/**
 * 配置对象
 */
declare interface IConfigObject{

    /**
     * 调试模式
     */
    debug:boolean;

    /**
     * 公众号的唯一标识
     */
    appid:string;

    /**
     * 生成签名的时间戳
     */
    timestamp:string;

    /**
     * 生成签名的随机串
     */
    nonceStr: string;

    /**
     * 签名信息
     */
    signature:string,

    /**
     * 需要使用的JS接口列表
     */
    jsApiList:string[],
}

/**
 * 检查js对象
 */
declare interface ICheckApiObject{
    /**
     * 需要检测的JS接口列表
     */
    jsApiList: string[],

    /**
     * 以键值对的形式返回，可用的api值true，不可用为false
     */
    success: (result:ICheckResult)=>void;
}
/**
 * 检查js结果
 */
declare interface ICheckResult{
    checkResult:any;
    errMsg:string;
}

/**
 * 地理位置对象
 */
declare interface IGetLocationObject{
    type:string;
    success:(res:IGetLocationResult)=>void;
    fail:()=>void;
}
/**
 * 地理位置结果
 */
declare interface IGetLocationResult{
    /**
     * 纬度，浮点数，范围为90 ~ -90
     */
    latitude:number;
    /**
     * 经度，浮点数，范围为180 ~ -180。
     */
    longitude:number;
    /**
     * 速度，以米/每秒计
     */
    speed:number;
    /**
     * 位置精度
     */
    accuracy:number;
}

/**
 * 分享到朋友圈对象
 */
declare interface IShareObject{
    title:string;
    link:string;
    imgUrl:string;
    success:string;
    cancel:string;
}
/**
 * 分享到qq,qq空间,腾讯微博
 */
declare interface IShareQQObject extends IShareObject{
    desc:string;
}
/**
 * 分享到朋友对象
 */
declare interface IShareFriendObject extends IShareQQObject{
    type?:"music"|"video"|"link";
}

/**
 * 支付对象
 */
declare interface IPayObject{
    /**
     * 支付签名时间戳
     */
    timestamp:string,
    /**
     * 支付签名随机串
     */
    nonceStr:string,
    /**
     * 统一支付接口返回的prepay_id参数值
     */
    package:string,
    /**
     * 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
     */
    signType:'SHA1'|"MD5",
    /**
     * 支付签名
     */
    paySign:string,
    /**
     * 成功回调
     */
    success: ()=>void;
    /**
     * 取消回调
     */
    cancel:()=>void;
    /**
     * 失败回调
     */
    fail:()=>void;
}


declare interface IWX{

    /**
     * 初始化微信对象
     */
    config:(obj:IConfigObject)=>void;

    /**
     * 微信对象初始化完成后调用该函数
     */
    ready:(fn:()=>void)=>void;

    /**
     * 检查客户端支持情况
     */
    checkJsApi:(obj:ICheckApiObject)=>void;

    /**
     * 获取地理位置
     */
    getLocation:(obj:IGetLocationObject)=>void;

    /**
     * 分享到朋友圈
     */
    onMenuShareTimeline:(obj:IShareObject)=>void;
    onMenuShareQQ:(obj:IShareQQObject)=>void;
    onMenuShareQZone:(obj:IShareQQObject)=>void;
    onMenuShareWeibo:(obj:IShareQQObject)=>void;
    onMenuShareAppMessage:(obj:IShareFriendObject)=>void;

    /**
     * 发起支付
     */
    chooseWXPay:(obj:IPayObject)=>void;
}

declare module "IWX"{
    export = IWX;
}