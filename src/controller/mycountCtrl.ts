/// <reference path="./../../typings/index.d.ts"/>
import HttpResult = require("./../modules/HttpResult");
import Connect = require("./../modules/Connect");
import Tool = require("./../modules/Tool");

let connect = new Connect();

/**
 * mycountCtrl
 */
class mycountCtrl {
    constructor() {}

    static async getUserByToken(params:any):Promise<HttpResult>{
        let result:HttpResult;
        let sql = "select * from user where id in (select user_id from user_token where access_token = '"+params.accessToken+")";
        let sqlResult = await connect.connect(sql);
        return new Promise<HttpResult>((resolve:(value:HttpResult)=>void,reject:(value:HttpResult)=>void)=>{
            let filterResult = Tool.FilterResult(["id","nickname","phone","face","sex","realname","email","gift_code","alipay","wxpay","referralCode","access_token"],sqlResult[0]);
            filterResult["accessToken"] = params.accessToken;
            result = HttpResult.CreateResult(filterResult,0,"查询成功!");
            resolve(result);
        })
    }
}

export = mycountCtrl;