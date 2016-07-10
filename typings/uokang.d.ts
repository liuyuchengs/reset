/**
 * 自定义对象
 */
declare module "Data"{
    /**
     * 用户信息
     */
    export interface IUser{
        /**
         * 用户id
         */
        id:number; 

        /**
         * 手机号码，必填
         */
        phone:string;

        /**
         * 真实姓名
         */
        realname:string;

        /**
         * 用户token
         */
        accessToken:string;

        /**
         * 可使用惠赠码状态，1:可用，0:不可用
         */
        giftCode:number; 

        /**
         * 头像地址
         */
        face:string; 

        /**
         * 昵称
         */
        nickname:string;

        /**
         * 性别
         */
        sex:string;  

        /**
         * 支付宝账号
         */
        alipay:string;

        /**
         * 微信账号
         */
        wxpay:string;

        /**
         * 邀请码
         */
        referralCode:number;

        /**
         * 年龄
         */
        age:number;
    }

    /**
     * 用户订单信息
     */
    export interface IUserOrder{
        /**
         * 订单id
         */
        id:number;

        /**
         * 订单号
         */
        orderNo:string;
        hospitalId:number;
        hospitalName:string;
        doctorId:number;
        doctorName:string;
        productId:number;
        productName:string;
        hospitalAddr:string;

        /**
         * 订单折后应付价格
         */
        discountprice:number; 
        status:number; //订单状态
        createtimeStr:string;
    }

    /**
     * 下拉参数
     */
    export interface IDropParams {
        /**
         * 标记是否被选中
         */
        has:boolean;
        /**
         * 存储下拉变量的值
         */
        val:string;
        /**
         * 存储下拉变量的查询id
         */
        id?:any;
        children?:IDropParams[];
    }

    /**
     * 查询参数
     */
    export interface IQueryParams{
        pageRows:number;
        currentPage:number;
    }

    /**
     * $http查询参数headers接口
     */
    export interface IHeaders{
        accessToken:string;
        contentType?:string;
    }

    /**
     * $http的查询参数接口
     */
    export interface IGetQuery{
        url:string;
        headers:IHeaders;
    }

    /**
     * $http服务的post参数
     */
    export interface IPostQuery{
        url:string;
        headers?:IHeaders;
        data:any;
    }

    /**
     * 路由注入的查询对象
     */
    export interface IRoutQueryObj {
        url:string;
        name:string;
    }
}

/**
 * 全局$rootScope对象
 */
declare module "IRootScope"{
    /**
     * 导航菜单
     */
    export interface INavMenu{
        home:boolean;
        doctor:boolean;
        interaction:boolean;
        user:boolean;
        has:boolean;
    }

    /**
     * 加载提示框
     */
    export interface ILoad{
        has:boolean;
        src:string;
        val:string;
    }

    /**
     * 消息提示框
     */
    export interface IMessageTip{
        has:boolean;
        message:string;
        hasCancel:boolean;
        hasComfirm:boolean;
        cancel:()=>void;
        comfirm:()=>void;
    }

    /**
     * 其他全局属性
     */
    export interface IGlobalProp{
        hasBgColor:boolean;
        hasBlackBg:boolean;
    }

    /**
     * 显示列表底部的提示文本
     */
    export interface IFollowTip{
        has:boolean;
        val:string;
        empty:string;
        no:string;
    }

    /**
     * $rootScope变量接口
     */
    export interface rootScope extends angular.IRootScopeService{
        navMenu:INavMenu;
        load:ILoad;
        messageTip:IMessageTip;
        followTip:IFollowTip;
        globalProp:IGlobalProp;
        switchNavMenu:(item:string)=>void;
        menuClick:(path:string)=>void;
        changeRoute:(path:string,query?:string)=>void;
    }

}

/**
 * 微信对象
 */
declare module "WX"{
    
    /**
     * 配置对象
     */
    export interface IConfigObject{

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
    export interface ICheckApiObject{
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
    export interface ICheckResult{
        checkResult:any;
        errMsg:string;
    }

    /**
     * 地理位置对象
     */
    export interface IGetLocationObject{
        type:"wgs84"|"gcj02";
        success:(res:IGetLocationResult)=>void;
        fail:()=>void;
    }

    /**
     * 地理位置结果
     */
    export interface IGetLocationResult{
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
    export interface IShareObject{
        title:string;
        link:string;
        imgUrl:string;
        success:string;
        cancel:string;
    }
    /**
     * 分享到qq,qq空间,腾讯微博
     */
    export interface IShareQQObject extends IShareObject{
        desc:string;
    }
    /**
     * 分享到朋友对象
     */
    export interface IShareFriendObject extends IShareQQObject{
        type?:"music"|"video"|"link";
        dataUrl?:string;
    }

    /**
     * 支付对象
     */
    export interface IPayObject{
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

    export interface wx{
        /**
         * 初始化微信对象
         */
        config:(obj:IConfigObject)=>void;

        /**
         * 微信对象初始化完成后调用该函数
         */
        ready:(fn:()=>void)=>void;

        /**
         * 微信对象初始化失败后调用该函数
         */
        error:(fn:(res:any)=>void)=>void;

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

        /**
         * 分享到qq
         */
        onMenuShareQQ:(obj:IShareQQObject)=>void;

        /**
         * 分享到qq空间,腾讯微博,微信朋友
         */
        onMenuShareQZone:(obj:IShareQQObject)=>void;

        /**
         * 分享到腾讯微博
         */
        onMenuShareWeibo:(obj:IShareQQObject)=>void;

        /**
         * 分享到微信朋友
         */
        onMenuShareAppMessage:(obj:IShareFriendObject)=>void;

        /**
         * 发起支付
         */
        chooseWXPay:(obj:IPayObject)=>void;
    }

    
}

