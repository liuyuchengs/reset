/**
 * 订单接口
 * 用户订单信息
 */
declare interface IUserOrder{
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

declare module "IUserOrder"{
    export = IUserOrder;
}
