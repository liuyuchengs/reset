import HttpResult = require("./../base/HttpResult");
import MysqlConnect = require("./../base/MysqlConnect");
import Tool = require("./../base/Tool");
import Koa = require("koa");

export async function checkCodeMoney(ctx:Koa.Context,next:any){
    if(ctx.request.body.productId){
        try{
            let result:any;
            let queryResult = await next();
            if(queryResult.length>0){
                result = queryResult[0];
            }else{
                result = {};
            }
            ctx.response.body = result;
        }catch(err){
            console.log(err);
            ctx.throw(500);
        }
    }else{
        ctx.throw(400);
    }
}

export async function  checkCodeMoneyQuery(ctx:Koa.Context){
    let productId = ctx.request.body.productId;
    let sql = `SELECT prefer_price as realMoney, prefer_price*0.1 as dealMoney,prefer_price*0.9 as payMoney,0 as giftMoney FROM product WHERE id = '${productId}'`;
    return await MysqlConnect.query(sql);
}

export async function make(ctx:Koa.Context,next:any){
    if(Tool.checkObjectPropsEmpty(ctx.request.body,["productId","scheduleId","patientName","patientTelephone","dealMoney","realMoney","payMoney"])){
        ctx.throw(400);
    }else{
        try{
            let result = await next();
            ctx.response.body = result;
        }catch(err){
            console.log(err);
            ctx.throw(500);
        }
    }
}

export async function makeQuery(ctx:Koa.Context){
    let body = ctx.request.body;
    let headers = ctx.request.header;
    let orderNo:string = convertDate(new Date());
    return new Promise<HttpResult>(async (resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
        try{
            let userId:number;
            let schedule:any;
            let queryUserId:any[] = await MysqlConnect.query(`SELECT id FROM alluser WHERE access_token = '${headers.accesstoken}'`);
            if(queryUserId.length>0){
                userId = queryUserId[0].id;
            }else{
                resolve(HttpResult.CreateFailResult("用户信息异常"));
            }
            let querySchedule:any[] = await MysqlConnect.query(`SELECT doctorId,hospital_id as hospitalId,date,starttime as time FROM schedule WHERE id = '${body.scheduleId}'`);
            if(querySchedule.length>0){
                schedule = querySchedule[0];
            }else{
                resolve(HttpResult.CreateSuccessResult("排班信息异常"));
            }
            let makeOrderSql = `INSERT INTO order_main (orderno, user_id, vistor_id, usertype, doctor_id, hospital_id, createtime, status, optype, productType,orderSource, product_id, scheduleid, treatmenttime, originalprice, discountprice, telephone, operatorid,isReviewDoctor,isReviewhospital, isAllowReDoctor, isAllowReHospital, isAllowAsk, isAllowUploadBill,payStatus, dealMoney, payMoney, giftMoney) VALUES('${orderNo}','${userId}', '${userId}', '4', '${schedule.doctorId}', '${schedule.hospitalId}', current_timestamp(), '0', '4', '2', '1', '${body.productId}', '${body.scheduleId}','${schedule.date.toLocaleDateString()} ${schedule.time}', '${body.realMoney}', '${body.realMoney}', '${body.patientTelephone}', '${userId}', '0', '0', '1', '1', '0', '1', '0', '${body.dealMoney}', '${body.payMoney}', '${body.realMoney-body.payMoney-body.dealMoney}')`;
            let makeOrderResult:any = await MysqlConnect.query(makeOrderSql);
            if(makeOrderResult.insertId>0){
                MysqlConnect.query(`UPDATE schedule SET status = '0' WHERE id = '${body.scheduleId}'`);
                let queryOrderSql = `SELECT * FROM order_main WHERE id = '${makeOrderResult.insertId}'`;
                let result = await MysqlConnect.query(queryOrderSql);
                resolve(HttpResult.CreateSuccessResult(result));
            }else{
                resolve(HttpResult.CreateFailResult("创建订单失败!"));
            }
        }catch(err){
            reject(err);
        }
    })
}

function convertDate(date:Date):string{
    return ""+date.getFullYear()+(date.getMonth()+1)+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds();
}