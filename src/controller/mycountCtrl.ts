/// <reference path="./../../typings/index.d.ts"/>
import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");
import Tool = require("./../modules/Tool");

/**
 * 账户相关模块
 * @module
 */

/**
 * 根据用户token获取用户信息
 * @param {any} params - 经过express parser转换的req.body,需要accessToken字段
 * @returns {HttpResult} 返回登录结果,异常时返回error异常对象
 */
export async function getUserByToken(params:any):Promise<HttpResult>{
    return new Promise<any>(async (resolve:(value:HttpResult)=>void,reject:(vlaue:Error)=>void)=>{
        let result:HttpResult;
        let sqlResult:any;
        let sql = `select * from user where id in (select user_id from user_token where access_token = '${params.accessToken}')`;        
        try{
            sqlResult = await MysqlConnect.query(sql);
            let filterResult = Tool.FilterResult(["id","nickname","phone","face","sex","realname","email","gift_code","alipay","wxpay","referralCode"],sqlResult[0]);
            filterResult["accessToken"] = params.accessToken;
            result = HttpResult.CreateResult(filterResult,0,"查询成功!");
            resolve(result);
        }catch(err){
            reject(err);
        }
    })
}