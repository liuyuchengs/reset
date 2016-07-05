/**
 * 订单类
 * 用户订单信息
 */
class UserOrder{
    id:number;
    orderNo:string;
    hospitalId:number;
    hospitalName:string;
    doctorId:number;
    doctorName:string;
    productId:number;
    productName:string;
    hospitalAddr:string;
    discountprice:number; //订单折后应付价格
    status:number; //订单状态
    createtimeStr:string;
    constructor(){};
}

export = UserOrder;
