/// <reference path="./../../typings/index.d.ts"/>
import HttpResult = require("./../modules/HttpResult");
import Connect = require("./../modules/Connect");
import Tool = require("./../modules/Tool");

let connect = new Connect();

/**
 * focusCtrl
 * 关注路由相关的控制器
 */
class focusCtrl {
    constructor() {}

    /**
     * 根据accessToken获取用户的粉丝数量和关注数量
     */
    static async getUserFocusCount(params:any):Promise<HttpResult>{
        let result:HttpResult;
        let fansSql = "select count(fansId) as fansCount from focus where focusId in (select user_id from user_token where access_token='"+params.accessToken+"')";
        let focusSql = "select count(focusId) as focusCount from focus where fansId in (select user_id from user_token where access_token='"+params.accessToken+"')";
        let fansResult = await connect.connect(fansSql);
        let focusResult = await connect.connect(focusSql);
        return new Promise<HttpResult>((resolve:(value:HttpResult)=>void,reject:(value:HttpResult)=>void)=>{
            result = HttpResult.CreateResult({"countFansMan":fansResult[0].fansCount,"countFocusMan":focusResult[0].focusCount},0,"查询成功!");
            resolve(result);
        })
    }
}

export = focusCtrl;