/// <reference path="./../../typings/index.d.ts"/>
import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");

/**
 * focusCtrl
 * 关注路由相关的控制器
 */
class FocusCtrl {
    constructor() {}

    /**
     * 根据accessToken获取用户的粉丝数量和关注数量
     */
    static async getUserFocusCount(params:any):Promise<HttpResult>{
        let result:HttpResult;
        let fansSql = "select count(fansId) as fansCount from focus where focusId in (select user_id from user_token where access_token='"+params.accessToken+"')";
        let focusSql = "select count(focusId) as focusCount from focus where fansId in (select user_id from user_token where access_token='"+params.accessToken+"')";
        try{
            let fansResult = await MysqlConnect.query(fansSql);
            let focusResult = await MysqlConnect.query(focusSql);
            return new Promise<HttpResult>((resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
                result = HttpResult.CreateResult({"countFansMan":fansResult[0].fansCount,"countFocusMan":focusResult[0].focusCount},0,"查询成功!");
                resolve(result);
            })
        }catch(err){
            console.log(err);
            return new Promise<HttpResult>((resolve:(value:HttpResult)=>void,reject:(value:any)=>void)=>{
                reject(err);
            })
        }
    }
}

export = FocusCtrl;