import Koa = require("koa");
import HttpResult = require("./../base/HttpResult");
import MysqlConnect = require("./../base/MysqlConnect");
import Tool = require("./../base/Tool");

export async function getToken(ctx:Koa.Context,next:any){
    if(ctx.request.body.accessToken){
        try{
            let queryResult:any = await next();
            let result = queryResult[0];
            result["accessToken"] = ctx.request.body.accessToken;
            ctx.response.body = HttpResult.CreateSuccessResult(result);
        }catch(err){
            console.log(err);
            ctx.throw(500);
        }
    }else{
        ctx.throw(400);
    }
}

export async function getTokenQuery(ctx:Koa.Context){
    let accessToken = ctx.request.body.accessToken;
    let result:HttpResult;
    let sqlResult:any;
    let sql = `select id,nickname,phone,face,sex,realname,email,gift_code,alipay,wxpay,referralCode from user where id in (select user_id from user_token where access_token = '${accessToken}')`; 
    return await MysqlConnect.query(sql);
}
