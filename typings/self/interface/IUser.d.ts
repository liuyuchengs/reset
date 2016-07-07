/**
 * 用户接口
 * 去除了部分无用字段
 */
declare interface IUser{

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

declare module "IUser"{
    export =  IUser;
}