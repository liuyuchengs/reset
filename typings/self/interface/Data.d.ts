declare module "Data"{
    /**
     * 用户信息
     */
    export interface User{
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
     * ParamsObj:下拉参数接口
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
        id:number;
    }

}