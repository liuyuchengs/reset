import Koa = require("koa");
import MysqlConnect = require("./../base/MysqlConnect")
import HttpResult = require("./../base/HttpResult");

/**
 * 查询项目的排班信息中间件 - 处理请求
 * @param {string} productId - 项目id
 * @returns {Object|Error} - 返回查询结果
 */
export async function querySchedule(ctx:Koa.Context,next:()=>Promise<any>){
    if(ctx.request.body.productId){
        try{
            let result = await next();
            ctx.response.body = {list:result};
        }catch(err){
            console.log(err);
            ctx.throw(500);
        }
    }else{
        ctx.throw(400);
    }
}

/**
 * 查询项目的排班信息中间件 - 处理请求
 * @param {string} productId - 项目id
 * @returns {Promise<any>} - 返回查询结果
 */
export async function queryScheduleQuery(ctx:Koa.Context){
    let id = ctx.request.body.productId;
    let date = new Date();
    let sql = `SELECT d.id,d.doctorname,d.hobby,d.score,d.hospitalid,d.face FROM doctor as d WHERE d.id in (SELECT doctorid FROM schedule WHERE hospital_id in (SELECT hospital_id FROM product WHERE id = '${id}') AND YEAR(date)= '${date.getFullYear()}' AND MONTH(date)= '${(date.getMonth()+1)}' AND DAY(date) >= '${date.getDate()}')`;
    return MysqlConnect.query(sql);
}