/// <reference path="./../../typings/index.d.ts"/>
import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");

/**
 * 关注相关的模块
 * @module
 */

/**
 * 根据accessToken获取用户的粉丝数量和关注数量
 * @param {any} params - 经过express parser转换的req.body，需有accessToken属性
 * @returns {HttpResult|any} 查询结果，异常时返回error异常对象
 */
export async function getUserFocusCount(accessToken:string):Promise<HttpResult>{
    let result:HttpResult;
    let sql = "select count(fansId) as countFansMan,(select count(focusId) from focus where fansId in (select user_id from user_token where access_token='"+accessToken+"')) as countFocusMan from focus where focusId in (select user_id from user_token where access_token='"+accessToken+"')";
    try{
        let queryResult = await MysqlConnect.query(sql);
        return new Promise<HttpResult>((resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
            result = HttpResult.CreateSuccessResult(queryResult[0]);
            resolve(result);
        })
    }catch(err){
        console.log(err);
        return new Promise<HttpResult>((resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
            reject(err);
        })
    }
}