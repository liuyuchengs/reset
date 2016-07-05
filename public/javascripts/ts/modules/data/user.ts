/**
 * 用户类
 * 去除了部分无用字段
 */
class User{
    id:number; //id
    phone:string; //手机号码
    realname:string;  //真实姓名
    accessToken:string; //用户token
    giftCode:number; //可使用惠赠码状态，1:可用，0:不可用
    face:string; //头像地址
    nickname:string;  //昵称
    sex:string;  //性别
    alipay:string; //支付宝账号
    wxpay:string; //微信账号
    referralCode:number; //邀请码
    age:number; //年龄
    constructor(){};
}

export = User;