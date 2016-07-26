import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");
import format = require("string-format");

/**
 * 订单相关接口
 * @module
 */

/**
 * 查询项目的价钱信息
 * @param {number} productId - 订单id
 * @returns {Object|Error} 返回查询结果
 */
export async function checkCodeMoney(productId:number):Promise<any>{
    return new Promise<any>(async (resolve:(value:any)=>void,reject:(value:any)=>void)=>{
        let sql = "SELECT prefer_price as realMoney, prefer_price*0.1 as dealMoney,prefer_price*0.9 as payMoney,0 as giftMoney FROM product WHERE id = '"+productId+"'";
        try{
            let queryResult = await MysqlConnect.query(sql);
            if(queryResult.length>0){
                resolve(queryResult[0]);
            }else{
                resolve({});
            }
        }catch(err){
            reject(err);
        }
    })
}

/**
 * 生成订单
 * @param {string} accessToken - 用户token
 * @param {number} productId - 项目id
 * @param {number} scheduleId - 排班id
 * @param {string} patientName - 用户真实姓名
 * @param {string} patientTelephone - 用户手机号码
 * @param {number} dealMoney - 在线支付金额
 * @param {number} realMoney - 折后套餐价格
 * @param {number} payMoney - 到店付价格 
 * @returns {HttpResult|Error} 返回订单生成结果
 */
export async function make(params:any){
    let orderNo:string = convertDate(new Date());
    return new Promise<HttpResult>(async (resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
        try{
            let userId:number;
            let schedule:any;
            let queryUserId:any[] = await MysqlConnect.query("SELECT id FROM alluser WHERE access_token = "+params.headers.accesstoken);
            if(queryUserId.length>0){
                userId = queryUserId[0];
            }else{
                resolve(HttpResult.CreateFailResult("用户信息异常"));
            }
            let querySchedule:any[] = await MysqlConnect.query("SELECT doctorId,hospital_id FROM schedule WHERE id = '"+params.scheduleId+"'");
            if(querySchedule.length>0){
                schedule = querySchedule[0];
            }else{
                resolve(HttpResult.CreateSuccessResult("排班信息异常"));
            }
            /*
            let sql = "INSERT INTO order_main (orderno, user_id, vistor_id, usertype, doctor_id, hospital_id, createtime, status, optype, productType,orderSource, product_id, scheduleid, treatmenttime, originalprice, discountprice, telephone, operatorid,isReviewDoctor,isReviewhospital, isAllowReDoctor, isAllowReHospital, isAllowAsk, isAllowUploadBill,payStatus, dealMoney, payMoney, giftMoney) "+
                    "VALUES ('"+orderNo+"','"+userId+"', '"+userId+"', '4', '"+schedule.doctorId+"', '"+schedule.hospitalId+"', current_timestamp(), '0', '4', '2', '1', '"+params.productId+"', '"+params.scheduleId+"', timestamp("++"), '14080', '14080', '18575600158', '11301', '0', '0', '1', '1', '0', '1', '0', '2816', '11264', '0')";*/
        
        }catch(err){
            reject(err);
        }
    })
    
}

function convertDate(date:Date):string{
    return ""+date.getFullYear()+(date.getMonth()+1)+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds();
}